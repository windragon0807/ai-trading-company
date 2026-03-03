from trading_firm.execution.paper import apply_fill_to_position


def test_apply_fill_long_reduce_realized_pnl() -> None:
    # Start long 10 @100, sell 4 @110 => realized +40, remain 6 @100
    new_qty, new_avg, realized = apply_fill_to_position(
        prev_qty=10.0,
        prev_avg_price=100.0,
        side="SELL",
        fill_qty=4.0,
        fill_price=110.0,
    )
    assert new_qty == 6.0
    assert new_avg == 100.0
    assert realized == 40.0


def test_apply_fill_short_cover_realized_pnl() -> None:
    # Start short -5 @50, buy 3 @45 => realized +(50-45)*3 = 15, remain -2 @50
    new_qty, new_avg, realized = apply_fill_to_position(
        prev_qty=-5.0,
        prev_avg_price=50.0,
        side="BUY",
        fill_qty=3.0,
        fill_price=45.0,
    )
    assert new_qty == -2.0
    assert new_avg == 50.0
    assert realized == 15.0
