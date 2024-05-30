const isNumeric = (string) => /^[+-]?\d+(\.\d+)?$/.test(string);

export const formatBill = (lines) => {
    const items = [];
    lines.map((line) => {
        line = line.replace("\n", "");
        var seperated = line.split(" ");
        if (isNumeric(seperated[0])) {
            var item = {
                qty: parseInt(seperated[0]),
                desc: false,
                unit_price: false,
                amount: false,
            };
            var itemName = "";
            for (let i = 1; i < seperated.length; i++) {
                if (isNumeric(seperated[i])) {
                    var tmpNumber = parseFloat(seperated[i]);
                    if (!item.desc) {
                        item.desc = itemName;
                        if (!item.unit_price) {
                            item.unit_price = tmpNumber;
                        }
                    } else {
                        item.amount = tmpNumber;
                    }
                } else {
                    itemName += seperated[i] + " ";
                }
            }
            if (item.desc && item.unit_price && item.amount) {
                items.push(item);
            }
        }
    });
    return items;
};
