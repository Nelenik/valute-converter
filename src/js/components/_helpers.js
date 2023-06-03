/**
 options = {
   count: 'number',
   outOf: {
     nominal:
     base:
   },
   to: {
     nominal:
     base
   }
 }

 */
export class Converter {
	static convert(options) {
		const { count, outOf, to } = options;
		const ratio = Converter.getRatio(outOf, to);
		return Number((count * ratio).toFixed(4));
	}
	static getRatio(outOf, to) {
		const outOfRatio = outOf.base / outOf.nominal;
		const toRatio = to.base / to.nominal;
		return outOfRatio / toRatio;
	}
}

export function sortBy(prop) {
	return (a, b) => {
		if (a[prop] < b[prop]) return -1;
	};
}

export function wait(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
