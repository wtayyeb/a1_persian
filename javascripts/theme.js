 if (window.jQuery) { 
  $(document).ready(function(){
    if (window.devicePixelRatio > 1) {
      var images = findImagesByRegexp('contacts_thumbnail', document);

      for(var i = 0; i < images.length; i++) {
        var lowres = images[i].src;
        old_size = lowres.match(/\/(\d*)$/)[1]
        var highres = lowres.replace(/\/(\d*)$/, "/" + String(old_size*2));
        images[i].src = highres;
      }

      var images = findImagesByRegexp(/gravatar.com\/avatar.*size=\d+/, document)

      for(var i = 0; i < images.length; i++) {
        var lowres = images[i].src;
        old_size = lowres.match(/size=(\d+)/)[1]
        var highres = lowres.replace(/size=(\d+)/, "size=" + String(old_size*2));
        images[i].src = highres;
        images[i].height = old_size;
        images[i].width = old_size;
      }    

// People avatars
      var images = findImagesByRegexp(/people\/avatar.*size=\d+$/, document)

      for(var i = 0; i < images.length; i++) {
        var lowres = images[i].src;
        old_size = lowres.match(/size=(\d+)$/)[1]
        var highres = lowres.replace(/size=(\d+)$/, "size=" + String(old_size*2));
        images[i].src = highres;
      }    


    }
  });
} else {
  document.observe("dom:loaded", function() {
    if (window.devicePixelRatio > 1) {
      var images = findImagesByRegexp('thumbnail', document);

      for(var i = 0; i < images.length; i++) {
        var lowres = images[i].src;
        old_size = lowres.match(/size=(\d*)$/)[1]
        var highres = lowres.replace(/size=(\d*)$/, "size=" + String(old_size*2));
        images[i].src = highres;
      }

      var images = findImagesByRegexp(/gravatar.com\/avatar.*size=\d+/, document)

      for(var i = 0; i < images.length; i++) {
        var lowres = images[i].src;
        old_size = lowres.match(/size=(\d+)/)[1]
        var highres = lowres.replace(/size=(\d+)/, "size=" + String(old_size*2));
        images[i].src = highres;
        images[i].height = old_size;
        images[i].width = old_size;      
      }    
    }

  });
}

function findImagesByRegexp(regexp, parentNode) {
   var images = Array.prototype.slice.call((parentNode || document).getElementsByTagName('img'));
   var length = images.length;
   var ret = [];
   for(var i = 0; i < length; ++i) {
      if(images[i].src.search(regexp) != -1) {
         ret.push(images[i]);
      }
   }
   return ret;
};


// persian part

/**
 * PDate Class
 * 
 * For modeling Shamsi dates, with some usefull utilities. 
 */

// pathtojs		= '/redmine/themes/wasimo/javascripts/'
// var sc_jquery	= document.createElement('script');
// sc_jquery.type	= 'text/javascript';
// sc_jquery.async	= false;
// sc_jquery.src	= pathtojs + 'jquery-1.6.2.min.js';
// (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(sc_jquery);

function PDate(year, month, day){
	if (!year || !month || !day){
		now = DateUtils.shamsiToday();
		var year = now.year;
		var month = now.month;
		var day = now.day;
	}
	this.year = this._year = year;
	this.month = this._month = month;
	this.day = this._day = day;
}

PDate.prototype._ADADS = ['صفر', 'یک', 'دو', 'سو', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه', 'ده', 'یازده', 'دوازده', 'سیزده', 'چهارده',
                          'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده', 'بیست', 'بیست و یک', 'بیست و دو', 'بیست و سه', 'بیست و چهار', 'بیست و پنج',
                          'بیست و شش', 'بیست و هفت', 'بیست و هشت', 'بیست و نه', 'سی ا', 'سی و یک', 'سی و دو'];
PDate.prototype._MONTH_NAMES = ['0',
                 			   'فروردین', 'اردیبهشت', 'خرداد',
                			   'تیر', 'مرداد', 'شهریور',
                			   'مهر', 'آبان', 'آذر',
                			   'دی', 'بهمن', 'اسفند'
                			   ];


PDate.prototype.isValid = function(){
    return (!isNaN(this.year) && !isNaN(this.month) && !isNaN(this.day));
};

PDate.prototype.getDay = function(){
	return this._day;
};

/**
 * Returns year if this PDate, in long format
 * 
 * @return The long year, in 13xx format
 */
PDate.prototype.getFullYear = function(){
	return (this._year<100 ? (1300+this._year) : this._year);
};

/**
 * Returns year if this PDate, in short format
 * 
 * @return The long year, in xx format
 */
PDate.prototype.getShortYear = function(){
	return (this._year<100 ? this._year : this._year-1300);
};

/**
 * A human-readable formatting of the date
 * @return the formatting
 */
PDate.prototype.toString = function(){
	return this._ADADS[this._day] + 'م ' + this._MONTH_NAMES[this._month] + ' ' + (this.getShortYear());
	//return this._year + '/' + this._month + '/' + this._day;
};

/**
 * A human-readable formatting of the date as a Miladi Date
 * @return the formatting like: 2011-06-13
 */
PDate.prototype.toMiladiString = function(){
	y = this._year<100 ? this._year + 2000 : this._year;
	m = this._month>9 ? this._month : '0'+this._month;
	d = this._day>9 ? this._day : '0'+this._day;
	return y+'-'+m+'-'+d;
};

/**
 * Returns this date as a string (e.g. for easy saving in a database)
 * 
 * @return A 6-char string showing this PDate
 */
PDate.prototype.toDBString = function (){
	y = this._year<100 ? this._year : this._year-1300;
	m = this._month>9 ? this._month : '0'+this._month;
	d = this._day>9 ? this._day : '0'+this._day;
	return y+''+m+''+d;
};

/**
 * Returns this date as a number (e.g. for easy saving in a database)
 * 
 * @return A 6-digit number showing this PDate
 */
PDate.prototype.intValue = function (){
	y = this._year<100 ? this._year : this._year-1300;
	return y*10000+this._month*100+this._day;
};

PDate.prototype.equals = function(other){
	return (this._day==other._day) && (this._month==other._month) && (this._year==other._year);
};


/**
 * 
 * DateUtils CLASS
 * 
 * Date conversion functions of DateUtils class are adopted 
 * from FarsiWeb Project, LGPL.
 * 
 * Provides methods for converting Miladi and Shamsi date systems. In addition
 * to methods fot getting now() in the Shamsi calendar. 
 */
var DateUtils = {
		_g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
		_j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29],
		 
		_div: function (a,b) {
		  return Math.floor(a/b);
		},
		
		_remainder: function (a,b) {
			return a - DateUtils._div(a,b)*b;
		},		
		
		/**
		 * Converts A given Miladi date to its Shamsi equivalent
		 * 
		 * @param miladi: An object having fields day, month, year
		 * @returns A PDate Object, having year, month, day, showing the
		 * 		Shamsi converted date 
		 */
		MiladiToShamsi: function (miladi){
		   var gy, gm, gd, jy, jm, jd, g_day_no, j_day_no, j_np, i;
		
		   gy = miladi.year-1600;
		   gm = miladi.month-1;
		   gd = miladi.day-1;
		
		   g_day_no = 365*gy+DateUtils._div((gy+3),4)-DateUtils._div((gy+99),100)+DateUtils._div((gy+399),400);
		   for (i=0;i<gm;++i)
			  g_day_no += DateUtils._g_days_in_month[i];
		   if (gm>1 && ((gy%4==0 && gy%100!=0) || (gy%400==0)))
			  /* leap and after Feb */
			  ++g_day_no;
		   g_day_no += gd;
		 
		   j_day_no = g_day_no-79;
		 
		   j_np = DateUtils._div(j_day_no, 12053);
		   j_day_no = DateUtils._remainder (j_day_no, 12053);
		 
		   jy = 979+33*j_np+4*DateUtils._div(j_day_no,1461);
		   j_day_no = DateUtils._remainder (j_day_no, 1461);
		 
		   if (j_day_no >= 366) {
			  jy += DateUtils._div((j_day_no-1),365);
			  j_day_no = DateUtils._remainder ((j_day_no-1), 365);
		   }
		 
		   for (i = 0; i < 11 && j_day_no >= DateUtils._j_days_in_month[i]; ++i) {
			  j_day_no -= DateUtils._j_days_in_month[i];
		   }
		   jm = i+1;
		   jd = j_day_no+1;
		
		   return new PDate(jy, jm, jd);
		},
		
		/**
		 * Converts A given Shamsi date to its Miladi equivalent
		 * 
		 * @param miladi: An object having fields day, month, year
		 * @returns A PDate Object, having year, month, day, showing the
		 * 		Miladi converted date 
		 */
		ShamsiToMiladi: function(shamsi){
		   var gy, gm, gd, jy, jm, jd, g_day_no, j_day_no, leap, i;
		
		   jy = shamsi.year-979;
		   jm = shamsi.month-1;
		   jd = shamsi.day-1;
		
		   j_day_no = 365*jy + DateUtils._div(jy,33)*8 + DateUtils._div((DateUtils._remainder (jy, 33)+3),4);
		   for (i=0; i < jm; ++i)
			  j_day_no += DateUtils._j_days_in_month[i];
		
		   j_day_no += jd;
		
		   g_day_no = j_day_no+79;
		
		   gy = 1600 + 400*DateUtils._div(g_day_no,146097); /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
		   g_day_no = DateUtils._remainder (g_day_no, 146097);
		
		   leap = 1;
		   if (g_day_no >= 36525) /* 36525 = 365*100 + 100/4 */
		   {
			  g_day_no--;
			  gy += 100*DateUtils._div(g_day_no,36524); /* 36524 = 365*100 + 100/4 - 100/100 */
			  g_day_no = DateUtils._remainder (g_day_no, 36524);
			  
			  if (g_day_no >= 365)
				 g_day_no++;
			  else
				 leap = 0;
		   }
		
		   gy += 4*DateUtils._div(g_day_no,1461); /* 1461 = 365*4 + 4/4 */
		   g_day_no = DateUtils._remainder (g_day_no, 1461);
		
		   if (g_day_no >= 366) {
			  leap = 0;
		
			  g_day_no--;
			  gy += DateUtils._div(g_day_no, 365);
			  g_day_no = DateUtils._remainder (g_day_no, 365);
		   }
		
		   for (i = 0; g_day_no >= DateUtils._g_days_in_month[i] + (i == 1 && leap); i++)
			  g_day_no -= DateUtils._g_days_in_month[i] + (i == 1 && leap);
		   gm = i+1;
		   gd = g_day_no+1;
	
		   return new PDate(gy, gm, gd);
		},
		
		shamsiToday: function () {
		  Today = new Date();
		  return DateUtils.MiladiToShamsi({
									year: Today.getFullYear(),
									month: Today.getMonth()+1,
									day: Today.getDate()
								  });
		}
};



/***********************
*   Custom Functions   *
***********************/

function localize_digits(x) {
    var s = ''+x;
    s = s.replace(/0/g, "۰");
    s = s.replace(/1/g, "۱");
    s = s.replace(/2/g, "۲");
    s = s.replace(/3/g, "۳");
    s = s.replace(/4/g, "۴");
    s = s.replace(/5/g, "۵");
    s = s.replace(/6/g, "۶");
    s = s.replace(/7/g, "۷");
    s = s.replace(/8/g, "۸");
    s = s.replace(/9/g, "۹");
    return s;
}


function try_miladi_to_shamsi(s){
    miladi = {year: 0, month: 0, day: 0};
    if (s.length != 10)
        return s;
    if (s[4] != '-' || s[7] != '-')
        return s;
    miladi.year  = parseInt(s.substr(0, 4), 10);
    miladi.month = parseInt(s.substr(5, 2), 10);
    miladi.day   = parseInt(s.substr(8, 2), 10);
    if (isNaN(miladi.year) || isNaN(miladi.month) || isNaN(miladi.day))
        return s;
    //TODO check number ranges
    
    cv = DateUtils.MiladiToShamsi(miladi);
//     return localize_digits(cv.year % 100) + "/" + localize_digits(('0' + cv.month).substr(0,2)) + "/" + localize_digits(('0' + cv.day).substr(0,2));
    return localize_digits(cv.year % 100) + "/" + localize_digits(('0' + cv.month).substr(-2)) + "/" + localize_digits(('0' + cv.day).substr(-2));
}


function convert_dates(){
    //Widen Search Areas
    $('.start-date,.due-date,.due_date,#activity>h3').each(function(){
        $(this).html(try_miladi_to_shamsi($(this).html()));
//         $(this).css("font-size", "15px");
    });
}


function try_smart_date_convert(s){
    var pnow = DateUtils.shamsiToday();
    var m = null;
    
    m = /([+-])(\d+)m/gi.exec(s);
    if (m != null){
        var p = (m[1]=='-') ? -1 : +1;
        pnow.month += p * parseInt(m[2], 10);
        return DateUtils.ShamsiToMiladi(pnow).toMiladiString();
    }
    
    m = /([+-])(\d+)y/gi.exec(s);
    if (m != null){
        var p = (m[1]=='-') ? -1 : +1;
        pnow.year += p * parseInt(m[2], 10);
        return DateUtils.ShamsiToMiladi(pnow).toMiladiString();
    }
    
    m = /([+-])(\d+)d?/gi.exec(s);
    if (m != null){
        var p = (m[1]=='-') ? -1 : +1;
        pnow.day += p * parseInt(m[2], 10);
        return DateUtils.ShamsiToMiladi(pnow).toMiladiString();
    }
    
    m = /(\d+)\/(\d+)\/(\d+)/gi.exec(s);
    if (m != null && m[1]<1500){
        if (m[1] < 100 ) m[1] += 1300;
        var d = new PDate(parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10));
        if (d.isValid())
            return DateUtils.ShamsiToMiladi(d).toMiladiString();
    }
    
    return s;
}


function enable_smart_date_fields(){
    target = $('#issue_start_date,#issue_due_date');
    target.css('background-color', '#D0DDFF');
    target.attr('title', 'NEW: type something like +2, -3, +1m, -2y or 90/3/29 and press Control to convert date!');
    target.keydown(function(event) {
      if (event.keyCode == '17') {
        event.preventDefault();
        $(this).attr("value", try_smart_date_convert($(this).attr("value")));
      }
    });

}


function force_notes(){
    $('#issue-form').submit(function(){
        var must_have = [
                        ['#notes', 'لطفا توضیح مناسبی را در مورد این به روز رسانی وارد نمایید.'],
//                        ['#time_entry_comments', 'Enter time comment!'],
                        ['#issue_estimated_hours', 'لطفا زمان تخمینی را وارد نمایید.'],
                        ['#issue_due_date', 'لطفا زمان پایان را مشخص نمایید.'],
                        ['#issue_start_date', 'لطفا زمان آغاز را وارد نمایید.'],
                        ['#issue_assigned_to_id', 'لطفا مسئول انجام کار را مشخص نمایید.']
        ];
        
        for (i=0; i<must_have.length; i++)
            if ($(must_have[i][0]).val() == "") {
                alert(must_have[i][1]);
                return false;
            }
  
  		if ($('#time_entry_hours').val()!="" && $('#time_entry_comments').val()=="") {
  			alert('Enter time comment!');
  			return false;
		}

/*        if ($('#time_entry_hours').val()!="" && $('#time_entry_custom_field_values_6').val()=="") {
            alert("لطفا شرح کار انجام شده را وارد نمایید.");
            return false;
        }
  */      
        if ($('#issue_done_ratio').val()!="0" && $('#issue_status_id').val()=="1") {
            alert("لطفا وضعیت را به در حال اجرا تغییر دهید.");
            return false;
        }

        var is_100 = $('#issue_done_ratio').val() == "100";
        var is_fin = $('#issue_status_id' ).val() == "5";
        if ((is_100 && !is_fin) || (!is_100 && is_fin)) {
            alert("کارهای با وضعیت انجام شده باید پیشرفت ۱۰۰ درصدی داشته باشند.");
            return false;
        }

        var ensure2 = function(s) { s += ''; if (s.length < 2) s = '0' + s; return s; };
        var currentDate = new Date()
        var day = ensure2(currentDate.getDate());
        var month = ensure2(currentDate.getMonth()+1);
        var year = ensure2(currentDate.getFullYear());
        var today = year + '-' + month + '-' + day;
        var done = $('td.progress p.pourcent').html();
        done = parseInt(done.substr(0, done.length - 1), 10);
        if ((parseInt($('#issue_done_ratio').val()) > done) && ($('#issue_due_date').val() < today) && ($('#issue_status_id').val()!="5") && ($('#issue_status_id').val()!="6" )) {
            alert("مهلت انجام این کار به پایان رسیده است؛ لطفا آن را به روز نمایید.");
            return false;
        }
    });

    $('form.tabular').submit(function(){
    	if ($('#time_entry_comments').length > 0) {
    		if ($('#time_entry_comments').val() == ''){
				alert('لطفا توضیح فعالیت انجام شده را وارد نمایید.');
				return false;
			}
		}
    });
}

function translate_author() {
    $('.author, .journal h4, .spent-time').each(function() {
        var s = $(this).html();
        replaces = [
                    ['minutes', 'دقیقه'],
                    ['minute', 'دقیقه'],
                    ['hours', 'ساعت'],
                    ['hour', 'ساعت'],
                    ['days', 'روز'],
                    ['day', 'روز'],
                    ['months', 'ماه'],
                    ['month', 'ماه'],
                    ['ago', 'پیش'],
                    ['about', 'حدود'],
                    ['less than a', 'کمتر از یک'],
                    ['Added', 'اضافه شده'],
                    ['Updated', 'به روز رسانی شده'],
                    ['by', 'توسط']
                    ];
        for (i=0; i<replaces.length; i++)
            s = s.replace(new RegExp(replaces[i][0], 'g'), replaces[i][1]);
        $(this).html(s);
    });
    
    $('.author, .journal h4').attr('style', 'direction: rtl; text-align: center; font-family: "B Nazanin"; font-size: 14px;');
}



/**************
*   Actions   *
**************/

function startup_events(){
    convert_dates();
    enable_smart_date_fields();
    force_notes();
    translate_author();
}

function maintain_events(){
    convert_dates();
}

$(document).ready(function(){
    startup_events();
    setTimeout('maintain_events()', 7000);

});



