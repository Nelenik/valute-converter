import { el, svg } from 'redom';
import { countryList } from './_country-list';

export function manageCourseTable(data) {
	const dateBlock = document.getElementById('courseDate');
	dateBlock.textContent = formatDate(data.Date);
	const tBody = document.querySelector('.courses__table').tBodies[0];
	const valuteObj = data.Valute;
	Object.values(valuteObj).forEach((item) => {
		if (item.CharCode !== 'RUB') {
			tBody.append(
				createTr({
					code: item.CharCode,
					nominal: item.Nominal,
					valute: item.Name,
					baseCourse: item.Value,
				})
			);
		}
	});
}

function formatDate(dateStr) {
	const date = new Date(dateStr);
	let day = date.getDate();
	day = day >= 10 ? day : `0${day}`;
	let month = date.getMonth() + 1;
	month = month >= 10 ? month : `0${month}`;
	return `${day}.${month}.${date.getFullYear()}`;
}

function createTr(options) {
	const { code, nominal, valute, baseCourse } = options;
	const tr = el('tr.courses__row', [
		el(
			'td',
			{ 'data-label': 'Код' },
			el('span.code', [
				svg(
					'svg.code__icon',
					svg('use', {
						xlink: { href: `sprite-color.svg#${countryList[code]}` },
					})
				),
				`${code}`,
			])
		),
		el('td', { 'data-label': 'Единица' }, el('span.nominal', `${nominal}`)),
		el('td', { 'data-label': 'Валюта' }, el('span.valute', `${valute}`)),
		el(
			'td',
			{ 'data-label': 'Курс базовой валюты' },
			el('span.base-course', `${baseCourse}`)
		),
	]);
	return tr;
}
