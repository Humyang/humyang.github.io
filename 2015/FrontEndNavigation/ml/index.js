$(document).ready(function($) {
	//生成目录

	jQuery('.sideDirectorie').mytoc();
	$('body').scrollspy();
	$('.sideDirectorie').bind('mousewheel DOMMouseScroll', function(e) {
		var scrollTo = null;

		if (e.type == 'mousewheel') {
			scrollTo = (e.originalEvent.wheelDelta * -1);
		} else if (e.type == 'DOMMouseScroll') {
			scrollTo = 40 * e.originalEvent.detail;
		}

		if (scrollTo) {
			e.preventDefault();
			$(this).scrollTop(scrollTo + $(this).scrollTop());
		}
	});

	$('.sideDirectorie').on('activate.bs.scrollspy', function() {
		// do something…
		// alert('1');
		$(".active-current").removeClass('active-current');
		$(".active").last().addClass('active-current');
	})
});

(function($) {
	$.fn.extend({
		mytoc: function(options) {
			//默认参数
			var defaultParams = {
				prefix: 'toc', //生成目录结构中元素的class属性的前缀
				selectors: 'h1, h2, h3, h4,h5,h6', //页面由h1,h2,h3来组织
				context: 'body' //处理body标签下面的selectors
			};
			var containNodeType = function(elementArray, nowElement) {
					for (index in elementArray) {
						if (elementArray[index] === nowElement) {
							return true;
						}
					}
					return false;
				}
				//用户可以通过传入自定义参数来覆盖默认设置
			var opts = $.extend({}, defaultParams, options);
			//获取所有需要加入到目录结构中的“头”元素
			var headings = $(opts.selectors, opts.context);
			//在所有的“头”元素前加上锚标签,如<span id="toc0">
			// headings.each(function(i, heading) {
			// 	$('<span/>').attr('id', opts.prefix + i).insertBefore(heading);
			// });
			//必须返回$(this).each(function(){}); 只有这样才能兼容jQuery的$.a().b().c()这种连续调用
			return $(this).each(function(i, toc) {
				//构建目录结构
				// var ul = $('<ul/>').attr('id', 'toc');

				var elementArray = []; //存储目录结构
				var ulArray = [];
				var topUl = $('<ul class="nav bs-docs-sidebar subtoc"/>');
				headings.each(function(i, heading) {



					var nodeType = $(this).prop('nodeName');
					var a = $('<a/>').attr('href', '#' + $(heading).attr('id')).text($(heading).text());

					switch (nodeType) {
						case "H1":
							var li = $('<li class="nav-H1"/>').addClass(heading.tagName.toLowerCase() + '-' + opts.prefix).append(a);
							topUl.append(li);
							break;
						case "H2":
							var li = $('<li class="nav-H2"/>').addClass(heading.tagName.toLowerCase() + '-' + opts.prefix).append(a);
							// if (topUl.find(".nav-H1").last().children('ul.nav-H2').length == 0) {
							topUl.find("li.nav-H1").last().append($('<ul class="nav nav-H2"/>'))

							// }
							topUl.find("ul.nav-H2").last().append(li);



							break;
						case "H3":
							var li = $('<li class="nav-H3"/>').addClass(heading.tagName.toLowerCase() + '-' + opts.prefix).append(a);
							// if (topUl.find("ul.nav-H2").last().children('ul.nav-H3').length == 0) {
							topUl.find("li.nav-H2").last().append($('<ul class="nav nav-H3"/>'));

							// }
							topUl.find("ul.nav-H3").last().append(li);


							break;
						case "H4":
							var li = $('<li class="nav-H4"/>').addClass(heading.tagName.toLowerCase() + '-' + opts.prefix).append(a);
							// if (topUl.find("ul.nav-H3").last().children('ul.nav-H4').length == 0) {
							topUl.find("li.nav-H3").last().append($('<ul class="nav nav-H4"/>'))
								// }
							topUl.find("ul.nav-H4").last().append(li);
							break;
						case "H5":
							var li = $('<li class="nav-H5"/>').addClass(heading.tagName.toLowerCase() + '-' + opts.prefix).append(a);
							// if (topUl.find("ul.nav-H4").last().children('ul.nav-H5').length == 0) {
							topUl.find("ul.nav-H4").last().append($('<ul class="nav nav-H5"/>'))
								// }
							topUl.find("ul.nav-H5").last().append(li);
							break;
						case "H6":
							var li = $('<li class="nav-H6"/>').addClass(heading.tagName.toLowerCase() + '-' + opts.prefix).append(a);
							// if (topUl.find("ul.nav-H5").last().children('ul.nav-H6').length == 0) {
							topUl.find("ul.nav-H5").last().append($('<ul class="nav nav-H6"/>'))
								// }
							topUl.find("ul.nav-H6").last().append(li);
							break;

							break;
					}

				});
				//将生成的目录结构ul对象添加到用户指定的HTML对象中
				$(toc).html(topUl);
			});
		}


	});

})(jQuery);