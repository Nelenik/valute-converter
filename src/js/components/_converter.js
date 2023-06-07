import { Converter, sortBy, wait } from './_helpers';
import { el, mount } from 'redom';
import { Select } from './vendor/Select.js';

export function manageConverter(data) {
	const fromSelectWrap = document.getElementById('fromSelect');
	const toSelectWrap = document.getElementById('toSelect');
	const btn = document.querySelector('.converter__btn');
	const fromField = document.getElementById('fromAmount');
	const toField = document.getElementById('toAmount');
	const valuteObj = data['Valute'];
	valuteObj.RUB = {
		CharCode: 'RUB',
		Nominal: 1,
		Name: 'Российсский рубль',
		NumCode: '643',
		Previous: 1.0,
		Value: 1.0,
	};
	const { selectFromData, selectToData } = makeSelectData(valuteObj);

	const fromSelect = new Select({
		selectContent: selectFromData,
		// onChange: convert(),
		additionalClass: 'converter__select-from',
		placeholderText: 'Выберите базовую валюту',
	});

	const toSelect = new Select({
		selectContent: selectToData,
		// onChange: convert(),
		additionalClass: 'converter__select-to',
		placeholderText: 'Выберите базовую валюту',
	});

	mount(
		fromSelect.dropdown,
		el('button.btn-reset.select__dropdown-close', {
			type: 'button',
		})
	);
	mount(
		toSelect.dropdown,
		el('button.btn-reset.select__dropdown-close', {
			type: 'button',
		})
	);

	fromSelect.appendAt(fromSelectWrap);
	toSelect.appendAt(toSelectWrap);
	// функция конвертации
	const convert = () => {
		const fromPath = valuteObj[fromSelect.selectValue];
		const toPath = valuteObj[toSelect.selectValue];
		toField.value = Converter.convert({
			count: fromField.value,
			outOf: {
				nominal: fromPath.Nominal,
				base: fromPath.Value,
			},
			to: {
				nominal: toPath.Nominal,
				base: toPath.Value,
			},
		});
	};
	convert();

	fromSelect.onChange = () => convert();
	toSelect.onChange = () => convert();

	fromField.addEventListener('input', () => {
		wait(300).then(() => convert());
	});

	btn.addEventListener('click', () => {
		const fromValue = fromSelect.selectValue;
		const toValue = toSelect.selectValue;
		fromSelect.changeValue(toValue);
		toSelect.changeValue(fromValue);
		convert();
	});

	document.addEventListener('click', (e) => {
		let target = e.target.closest('.select__dropdown-close');
		if (!target) return;
		if (fromSelect.isOpen) fromSelect.isOpen = false;
		if (toSelect.isOpen) toSelect.isOpen = false;
	});
}
// функция формирования массива с данными для отирсовки селекта
function makeSelectData(valuteObj) {
	const selectFromData = [];
	const selectToData = [];
	for (let prop in valuteObj) {
		selectFromData.push({
			text: `${valuteObj[prop].Name}`,
			value: prop,
			name: 'valutes',
			selected: prop === 'USD' ? true : false,
		});

		selectToData.push({
			text: `${valuteObj[prop].Name}`,
			value: prop,
			name: 'valutes',
			selected: prop === 'RUB' ? true : false,
		});
	}

	selectFromData.sort(sortBy('text'));
	selectToData.sort(sortBy('text'));
	return { selectFromData, selectToData };
}
