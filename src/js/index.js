import { manageConverter } from './components/_converter';
import { manageCourseTable } from './components/_courses';

fetch('https://www.cbr-xml-daily.ru/daily_json.js')
	.then((res) => res.json())
	.then((res) => {
		manageConverter(res);
		manageCourseTable(res);
	});
