import { el, setChildren } from 'redom';
/*
Простой селект, единичный выбор, поиск, автодополнение, построен на базе группы радиокнопок (нужна именно группа с одинаковым name, для правильной навигации), можно указывать изначально выбранный элемент указав true в свойстве selected, в качестве аргументов принимает:
const mySelect = new Select(options);
--options: {
  const selectContent = [
  { text: 'По номеру', value: 'account', name: 'sort', selected: false },
  { text: 'По балансу', value: 'balance', name: 'sort', selected: false },
  { text: 'По последней транзакции', value: 'transactions.0.date', name: 'sort', selected: true },
];
  onChange: (instance, radioBtnValue)=>{},(получает экземпляр и значение радиокнопки)
  onOpen: (instance)=>{},
  onClose: (instance)=>{},
  onInput: (instance, inputValue)=>{},(работает с triggerType: 'text', при вводе в инпут, получает экземпляр и значение инпута)
  additionalClass: 'some-class',(доп. класс добавляется к обертке селекта, полезно при стилизации разных селектов)
  placeholderText: 'some-text',(название списка),
  toChangePlaceholder: true(def), (нужно ли изменять плейсхолдер при выборе)
  triggerType: 'button'(def), (тип дропдауна, если нужно текстовое поле с автодополнением нужно указать 'text')
}
--методы:
mySelect.appendEl(target) - target -это элемент в который вставляем селект, в конец
mySelect.prependEl(target)- target -это элемент в который вставляем селект в начало
mySelect.reset() - сбрасываем выбраныне значения полностью, даже если были изначально выбранные,
mySelect.changeValue(newValue) - позволяет изменять на лету значение селекта. в newValue передается строка

--доступные свойства
mySelect.selectValue - получить значение селекта/инпута
mySelect.isOpen = true/false - открывает закрвает дропдаун
mySelect.selectContent = массив со значениями радиокнопок: { text: 'По номеру', value: 'account', name: 'sort' }, можно передать его позже

--зависим от библиотеки redom
--нужно быть осторожным с полем 'name' для других элементов формы, чтобы не было конфликта, также при использовании FormData полученный объект нужно будет отредактировать вручную, т.к. радиокнопка туда попадет.
*/

export class Select {
	constructor(options) {
		const {
			selectContent,
			onChange = () => {},
			onOpen = () => {},
			onClose = () => {},
			onInput = () => {},
			additionalClass = '',
			placeholderText = '',
			toChangePlaceholder = true,
			triggerType = 'button',
		} = options;

		this.onChange = onChange;
		this.onOpen = onOpen;
		this.onClose = onClose;
		this.onInput = onInput;
		this.additionalClass = additionalClass;
		this.placeholderText = placeholderText;
		this.toChangePlaceholder = toChangePlaceholder;
		this.triggerType = triggerType;

		this.isSelected = null;
		this.selectValue = '';

		// создаем элементы селекта
		this.select = el(`div.select.${this.additionalClass}`);
		// триггер кнопка
		this.selectTrigger = el(
			'button.btn-reset.select__btn',
			{
				type: 'button',
				'aria-label': 'Открыть выпадающий список',
				name: 'selectTriggerBtn',
			},
			this.placeholderText
		);
		// триггер текстовый инпут для автозаполнения
		this.autocompleteInput = el('input.select__autocomplete', {
			type: 'text',
			placeholder: this.placeholderText,
			name: 'selectAutocomplete',
			value: '',
		});

		this.dropdown = el('div.select__dropdown');
		this.selectContent = selectContent;
		setChildren(this.select, [
			this.isSelect() ? this.selectTrigger : this.autocompleteInput,
			this.dropdown,
		]);
		this.isOpen = false;

		this.autocomplHandlers();
		this.selectTriggerHandlers();
		this.docHandlers();
	}

	set selectContent(value) {
		this._selectContent = value;
		this.radioWrap = value?.map((item) => {
			const radioBtn = el('input.select__def-radio', {
				type: 'radio',
				value: item.value,
				name: item.name,
				checked: item.selected,
			});
			const radioLabel = el('label.select__item');
			setChildren(radioLabel, [
				radioBtn,
				el('span.select__item-text', { 'data-code': item.value }, item.text),
			]);
			// если радиокнопка изначально выбрана
			this.setSelected(radioBtn, item.text);
			// обработчики
			this.radioHandlers(radioBtn, item);
			return radioLabel;
		});
		setChildren(this.dropdown, this.radioWrap);
		this.radioBtns = [...this.dropdown.querySelectorAll('input[type="radio"]')];
	}

	get selectContent() {
		return this._selectContent;
	}

	set isOpen(value) {
		this._isOpen = value;
		value ? this.openDropdown() : this.closeDropdown();
	}

	get isOpen() {
		return this._isOpen;
	}

	// проверяем тип select vs autocomplete
	isSelect() {
		if (this.triggerType === 'button') {
			return true;
		} else if (this.triggerType === 'text') {
			return false;
		} else {
			throw new Error('The triggerType setting should be "button" or "text"');
		}
	}
	// настраиваем выбранный элементв и значение кастомного селекта
	setSelected(radioBtn, itemText) {
		if (radioBtn.checked) {
			this.isSelected = radioBtn;
			this.selectValue = this.isSelected.value;
			if (this.toChangePlaceholder) {
				if (this.isSelect()) {
					this.selectTrigger.textContent = itemText;
					this.selectTrigger.value = this.selectValue;
					this.select.classList.add('select--selected');
				} else this.autocompleteInput.value = itemText;
			}
			this.onChange(this, this.selectValue);
		}
	}
	//функции с обработчиками по элементам
	radioHandlers(radioBtn, selectContentItem) {
		radioBtn.addEventListener('click', async (e) => {
			if (e.clientX && e.clientY) {
				const target = e.currentTarget;
				target.checked = true;
				this.setSelected(target, selectContentItem.text);
				this.isOpen = false;
			}
		});

		radioBtn.addEventListener('keyup', async (e) => {
			if (e.key === 'Enter' || e.key === 'Return') {
				const target = e.currentTarget;
				target.checked = true;
				this.setSelected(target, selectContentItem.text);
				this.isOpen = false;
			}
		});
	}

	selectTriggerHandlers() {
		this.selectTrigger.addEventListener('click', () => {
			this.isOpen = !this.isOpen;
		});
		this.selectTrigger.addEventListener(
			'keydown',
			this.btnKeydownHandler.bind(this)
		);
	}
	autocomplHandlers() {
		this.autocompleteInput.addEventListener('input', (e) => {
			this.isSelected = null;
			this.onInput(this, e.currentTarget.value);
		});
		this.autocompleteInput.addEventListener(
			'keydown',
			this.btnKeydownHandler.bind(this)
		);
	}

	docHandlers() {
		document.addEventListener('keydown', this.docKeydownHandler.bind(this));
		document.addEventListener('click', (e) => {
			if (
				(!e.target.closest('.select') ||
					e.target.closest('.select') !== this.select) &&
				this.isOpen
			)
				this.isOpen = false;
		});
	}

	btnKeydownHandler(e) {
		if (e.code === 'ArrowDown') {
			e.preventDefault();
			if (!this.isOpen) {
				if (this.isSelect()) {
					this.isOpen = true;
				} else return;
			} else if (this.isSelected) {
				this.isSelected.focus();
			} else {
				const firstRadio = this.radioBtns[0];
				firstRadio.focus();
				firstRadio.click();
			}
		}
	}

	docKeydownHandler(e) {
		if (this.isOpen) {
			if (e.code === 'Tab') {
				e.preventDefault();
				this.isOpen = false;
			}
			if (e.code === 'Escape') {
				this.isOpen = false;
			}
		}
	}

	openDropdown() {
		this.onOpen(this);
		this.dropdown.classList.add('select__dropdown--js-shown');
		this.select.classList.add('select--active');
		if (this.isSelect()) {
			this.selectTrigger.setAttribute('aria-expanded', true);
		} else {
			this.autocompleteInput.setAttribute('aria-expanded', true);
		}
	}

	closeDropdown() {
		this.onClose(this);
		if (this.isSelect()) {
			this.selectTrigger.focus();
			this.selectTrigger.setAttribute('aria-expanded', false);
		} else {
			this.autocompleteInput.focus();
			this.autocompleteInput.setAttribute('aria-expanded', false);
		}
		this.dropdown.classList.remove('select__dropdown--js-shown');
		this.select.classList.remove('select--active');
	}

	appendAt(target) {
		target.append(this.select);
	}
	prependAt(target) {
		target.prepend(this.select);
	}
	reset() {
		this.selectValue = '';
		this.isSelected.checked = false;
		this.isSelected = null;
		if (this.isSelect()) {
			this.selectTrigger.textContent = this.placeholderText;
			this.selectTrigger.value = this.selectValue;
			this.select.classList.remove('select--selected');
		} else {
			this.autocompleteInput.value = '';
		}
	}
	changeValue(newValue) {
		const targetBtn = this.radioBtns.find((radio) => radio.value === newValue);
		targetBtn.checked = true;
		this.setSelected(targetBtn, targetBtn.nextElementSibling.textContent);
	}
}
