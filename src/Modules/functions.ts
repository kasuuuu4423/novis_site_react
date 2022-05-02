export const replaceAllReturns = (text: string): string =>{
    return text.replace(/\\n/g, '\n');
}

export const map = (target_num: number, in_min: number, in_max: number, out_min: number, out_max: number) => {

    // 入力値(最大)と変換したい値の "差"
	const input_diff = in_max - target_num

    // 入力値の長さ
	const input_range = in_max - in_min

    // 出力値の長さ
	const output_range = out_max - out_min

    // (差 / 長さ) で "割合" を出す
	const percentage = input_diff / input_range

    // 前項の "割合" を使って "出力値側" の、最大値との "差" を出す
	const out_diff = percentage * output_range

    // "出力の最大値" から "出力値側の差" を除く
    // ※ "output_range" からではなく "out_max" から
	const rs = out_max - out_diff

    //結果
	return rs
}

export const sortByKeys = (object: Object) =>{
    const pairs = Object.entries(object);
    pairs.sort(function(p1, p2){
        let p1Key = p1[0], p2Key = p2[0];
        if(p1Key < p2Key){ return -1; }
        if(p1Key > p2Key){ return 1; }
        return 0;
    })
    const newObject = Object.fromEntries(pairs);
    return newObject;
}

//export const 