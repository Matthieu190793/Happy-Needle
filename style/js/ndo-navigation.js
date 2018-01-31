function run_navigation()
{
	const cte_id_nav_bar = "nav_bar";
	const cte_id_input_menu = "input_menu";

	var size_body_y = $(window).height();
	var size_nav_bar = get_height_nav_bar(cte_id_nav_bar);
	var state = init_nav_bar(cte_id_nav_bar, info_css);
	var pos_scroll = 0;
	var pos_last_scroll = 0;
	var info_css = {};

	state = init_nav_bar(cte_id_nav_bar, info_css);
	$(window).scroll(function ()
	{
		size_body_y = $(window).height();
		pos_scroll = $(window).scrollTop();
		if ((state == 0) && (pos_scroll > size_nav_bar))
		{
			info_css = get_css_value_nav_bar_by_state(cte_id_nav_bar, 1);
			$("#"+cte_id_nav_bar).css({position:info_css.pst, top:info_css.top, backgroundColor:info_css.bgnd, opacity:info_css.opcty});
			$("#"+cte_id_nav_bar).css({boxShadow:""});
			$("#"+cte_id_nav_bar+" ul li a").css({color:""});
			state = 1;
		}
		else if ((state == 1) && (pos_scroll <= size_nav_bar))
		{
			info_css = get_css_value_nav_bar_by_state(cte_id_nav_bar, 0);
			$("#"+cte_id_nav_bar).css({position:info_css.pst, top:info_css.top, backgroundColor:info_css.bgnd, opacity:info_css.opcty});
			$("#"+cte_id_nav_bar).css({boxShadow:"none"});
			$("#"+cte_id_nav_bar+" ul li a").css({color:info_css.color});
			state = 0;
		}
		else if ((state == 1) && (pos_scroll >= size_body_y))
		{
			info_css = get_css_value_nav_bar_by_state(cte_id_nav_bar, 2);
			$("#"+cte_id_nav_bar).animate({top:info_css.top, opacity:info_css.opcty}, info_css.tming);
			pos_last_scroll = pos_scroll;
			state = 2;
		}
		else if ((state == 2) && (pos_scroll < size_body_y))
		{
			info_css = get_css_value_nav_bar_by_state(cte_id_nav_bar, 1);
			$("#"+cte_id_nav_bar).animate({top:info_css.top, opacity:info_css.opcty}, info_css.tming);
			$("#"+cte_id_nav_bar).css({boxShadow:""});
			$("#"+cte_id_nav_bar+" ul li a").css({color:""});
			state = 1;
		}
		else if ((state == 2) && (pos_scroll >= (pos_last_scroll + size_body_y / 2)))
		{
			info_css = get_css_value_nav_bar_by_state(cte_id_nav_bar, 1);
			$("#"+cte_id_nav_bar).animate({top:info_css.top, opacity:info_css.opcty}, info_css.tming);
			pos_last_scroll = pos_scroll;
			state = 3;
		}
		else if ((state == 3) && (pos_scroll < pos_last_scroll))
		{
			info_css = get_css_value_nav_bar_by_state(cte_id_nav_bar, 2);
			$("#"+cte_id_nav_bar).animate({top:info_css.top, opacity:info_css.opcty}, info_css.tming);
			pos_last_scroll = pos_scroll;
			state = 2;
		}
		else if (((state == 2) && (pos_scroll < pos_last_scroll)) || ((state == 3) && (pos_scroll >= pos_last_scroll)))
		{
			pos_last_scroll = pos_scroll;
		}
	});

	$("#"+cte_id_input_menu).click(function ()
	{
		if ($("#"+cte_id_input_menu).is(":checked") == true)
		{
			$("body").css({overflow:"hidden"});
		}
		else
		{
			$("body").css({overflow:"visible"});
		}
	});

	$(window).resize(function ()
	{
		if (state == 0)
		{
			size_nav_bar = get_height_nav_bar(cte_id_nav_bar);
			info_css = get_css_value_nav_bar_by_state(cte_id_nav_bar, 0);
			$("#"+cte_id_nav_bar).css({top:info_css.top});
		}
	});
}

function get_height_nav_bar(cte_id_nav_bar)
{
	return parseInt(get_css_value("#"+cte_id_nav_bar, "top")) + parseInt(get_css_value("#"+cte_id_nav_bar, "height"));
}

function init_nav_bar(cte_id_nav_bar, info_css)
{
	info_css = get_css_value_nav_bar_by_state(cte_id_nav_bar, 0);
	$("#"+cte_id_nav_bar).css({position:info_css.pst, top:info_css.top, backgroundColor:info_css.bgnd});
	$("#"+cte_id_nav_bar).css({boxShadow:"none"});
	$("#"+cte_id_nav_bar+" ul li a").css({color:info_css.color});

	return 0;
}

function get_css_value_nav_bar_by_state(cte_id_nav_bar, state)
{
	var selector = "."+cte_id_nav_bar+"_state_"+state;
	var get = {};

	if (state == 0)
	{
		get.pst = get_css_value(selector, "position");
		get.top = get_css_value(selector, "top");
		get.bgnd = get_css_value(selector, "background-color");
		get.opcty = get_css_value(selector, "opacity");
		get.color = get_css_value(selector, "color");
	}
	else if (state == 1)
	{
		get.pst = get_css_value(selector, "position");
		get.top = get_css_value(selector, "top");
		get.bgnd = get_css_value(selector, "background-color");
		get.opcty = get_css_value(selector, "opacity");
		get.tming = get_css_value(selector, "transition");
		get.tming = formatting_timing_css(get.tming);
	}
	else if (state == 2)
	{
		get.top = get_css_value(selector, "top");
		get.opcty = get_css_value(selector, "opacity");
		get.tming = get_css_value(selector, "transition");
		get.tming = formatting_timing_css(get.tming);
	}

	return get;
}

function get_css_value(selector, property)
{
	return $(selector).css(property);
}

function formatting_timing_css(elem)
{
	var i = 0;
	var min = -1;
	var max = -1;
	
	for (i=0 ; i < elem.length ; i++)
	{
		if ((min == -1) && (elem[i] >= '0') && (elem[i] <= '9'))
		{
			min = i;
		}
		else if ((min >= 0) && (max == -1) && (elem[i] == 's'))
		{
			max = i;
		}
	}

	return 1000*elem.substring(min, max);
}