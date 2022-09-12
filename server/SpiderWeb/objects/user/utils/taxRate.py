taxBrackets = {
    "federal": [
        (0, 0),
        (0.1, 9950),
        (0.12, 40525),
        (0.22, 86375),
        (0.24, 164925),
        (0.32, 209425),
        (0.35, 523600),
        (0.37, float("inf")),
    ],
    "dc": [
        (0, 0),
        (0.04, 10000),
        (0.06, 40000),
        (0.065, 60000),
        (0.085, 250000),
        (0.0925, 500000),
        (0.975, 1000000),
        (0.1075, float("inf")),
    ],
}


def calculateTieredTaxes(taxableValue, taxBrackets) -> float:
    return sum(
        [
            rate * max(0, min(cap, taxableValue) - taxBrackets[i - 1][1])
            for i, (rate, cap) in enumerate(taxBrackets)
        ]
    )
