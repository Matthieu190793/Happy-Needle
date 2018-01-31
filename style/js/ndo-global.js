const cte_size_small = 860;
const cte_size_large = 1280;

var state_resp_menu = get_state_resp_menu();

$(window).resize(function()
{
	state_resp_menu = get_state_resp_menu();
});

function get_state_resp_menu()
{
	var state = -1;
	var body_x = $(window).width();

	if (body_x < cte_size_small)
	{
		state = 0;
	}
	else if ((body_x >= cte_size_small) && (body_x < cte_size_large))
	{
		state = 1;
	}
	else if (body_x >= cte_size_large)
	{
		state = 2;
	}

	return state;
}