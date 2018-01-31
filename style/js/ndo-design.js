function run_extended_design()
{	
	anim_parallax();
	anim_contain();
}

function anim_parallax()
{
	const cte_class_anim_parallax = "extrait";

	$("."+cte_class_anim_parallax).parallax("50%", 0.5);
}

function anim_contain()
{
	const cte_class_anim_contain = "anim_js";
	const cte_tempo_anim = 500;

	var tab_id = [];
	var tab_flag = [];
	var tab_size_x = [];
	var tab_size_y = [];
	var tab_anim = [];

	$("."+cte_class_anim_contain).each(function (index)
	{
		var i = 0;
		var tmp = -1;

		$(this).attr("id", "id_"+cte_class_anim_contain+"_"+index);
		tab_id[index] = $(this).attr("id");
		tab_flag[index] = 0;
		tab_size_x[index] = $(this).position().left;

		for (i=0 ; i < tab_size_y.length ; i++)
		{
			if ($("#"+tab_id[i]).position().top == $(this).position().top)
			{
				tmp = $(this).position().top + parseInt($(this).css("height"));
				if (tab_size_y[i] > tmp)
				{
					tmp = tab_size_y[i];
				}
				else
				{
					tab_size_y[i] = tmp;
				}
			}
		}
		if ((i == 0) || (tmp == -1))
		{
			tmp = $(this).position().top + parseInt($(this).css("height"));
		}
		tab_size_y[index] = tmp;

		tmp = $(this).attr("class").search("opt_js_");
		if (tmp >= 0)
		{
			tab_anim[index] = $(this).attr("class").substring(tmp+("opt_js_").length, $(this).attr("class").length);
		}

		$(this).css({position:"relative", opacity:"0"});
	});

	$(window).scroll(function ()
	{
		var pos_bottom_viewer = $(window).height() + $(window).scrollTop();
		var last_pos_top = 0;
		var i = 0;
		var j = 0;
		var anim = 't';
		var anim_delay;

		for (i=0 ; i < tab_flag.length ; i++)
		{
			if ((tab_flag[i] == 0) && (tab_size_y[i] < pos_bottom_viewer))
			{
				if ($("#"+tab_id[i]).position().top == last_pos_top)
				{
					anim_delay += cte_tempo_anim;
				}
				else
				{
					anim_delay = 0;
				}
				last_pos_top = $("#"+tab_id[i]).position().top;

				for (j=0 ; j < tab_anim[i].length ; j++)
				{
					if (((state_resp_menu == 0) && (tab_anim[i][j] == 'S')) || ((state_resp_menu == 1) && (tab_anim[i][j] == 'M')) || ((state_resp_menu == 2) && (tab_anim[i][j] == 'L')))
					{
						anim = tab_anim[i][j+2];
					}
				}

				if (anim == 't')
				{
					$("#"+tab_id[i]).css({top:"4em"});
					$("#"+tab_id[i]).delay(anim_delay).animate({top:"0", opacity:"1"}, cte_tempo_anim);
				}
				else if (anim == 'l')
				{
					$("#"+tab_id[i]).css({left:"4em"});
					$("#"+tab_id[i]).delay(anim_delay).animate({left:"0", opacity:"1"}, cte_tempo_anim);
				}
				else if (anim == 'r')
				{
					$("#"+tab_id[i]).css({right:"4em"});
					$("#"+tab_id[i]).delay(anim_delay).animate({right:"0", opacity:"1"}, cte_tempo_anim);
				}
				tab_flag[i] = 1;
			}
		}
	});
}

function display_anim_contain(tab_id, tab_flag, tab_size_x, tab_size_y, tab_anim)
{
	var i = 0;

	for (i=0 ; i < tab_flag.length ; i++)
	{
		alert(tab_id[i]+" "+tab_flag[i]+" "+tab_size_x[i]+"/"+tab_size_y[i]+" "+tab_anim[i]);
	}
}