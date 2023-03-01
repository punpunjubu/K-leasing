import _ from 'lodash';
import moment from 'moment'

const DEFAULT_AMOUNT_SEPARATOR = ',';

export function isClientSide() {
    return typeof window !== 'undefined';
}

export function numberWithSeparators(value, sep = DEFAULT_AMOUNT_SEPARATOR) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sep);
}

export function formatAmount(amount, toFixed = 2) {
    if (amount === '' || Number.isNaN(amount)) {
        return '';
    }

    return numberWithSeparators(parseFloat(amount).toFixed(toFixed));
}
export function formatNumber(amount, toFixed = 2) {
    if (amount === '' || Number.isNaN(amount)) {
        return '';
    }

    return Number(parseFloat(amount).toFixed(toFixed));
}
export function excelDateToJSDate(serial) {
    var utc_days = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;
    var date_info = new Date(utc_value * 1000);

    var fractional_day = serial - Math.floor(serial) + 0.0000001;

    var total_seconds = Math.floor(86400 * fractional_day);

    var seconds = total_seconds % 60;

    total_seconds -= seconds;

    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;
    return moment(new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds)).format('YYYY/MM/DD');
}
export const DateFormatFront = (data) => moment(new Date(data), 'YYYY/MM/DD')
export const DateFormat = (data) => moment(data, 'YYYY/MM/DD')
export const DateShowFormat = (data) => moment(new Date(data), 'YYYY/MM/DD').format("DD-MM-YYYY")
export const DateFormatTH = (data, type = '') => {
    const thday = ["อาทิตย์", "จันทร์",
        "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์"];
    const thmonth = ["มกราคม", "กุมภาพันธ์", "มีนาคม",
        "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน",
        "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
    const months_th_mini = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.",];
    const d = moment(new Date(data), 'YYYY/MM/DD')
    const yTH = moment(new Date(data), 'YYYY/MM/DD').add(543, 'year').format('YYYY')
    if (type === 1) {
        return `${d.format('MMMM')} ${d.format('YYYY')}`
    } else if (type === 2) {
        return `${thmonth[d.month()]} ${yTH}`
    }
    return `${d.format('D')} ${thmonth[d.month()]} ${yTH}`
}
export const CountRate = (day, masterCondition, rate) => {
    let rateMaster = {}
    const minDay = [30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 9999]
    for (let index = 0; index < minDay.length; index++) {
        let dateRate = 0
        if (!_.isUndefined(masterCondition) && !_.isUndefined(masterCondition[`date_rate_${index + 1}`])) {
            dateRate = Number(`${masterCondition[`date_rate_${index + 1}`]}`) || 0
        }
        if (dateRate) {
            let d = 0
            if (!_.isUndefined(masterCondition) && !_.isUndefined(masterCondition[`date_rate_${index}`])) {
                d = Number(`${masterCondition[`date_rate_${index}`]}`) || 0
            }
            if (day <= minDay[index]) {
                rateMaster = {
                    type: minDay[index],
                    value: rate + dateRate,
                    oldValue: rate + d
                }
                break
            }
        } else {
            if (day <= minDay[index]) {
                rateMaster = {
                    type: 'nomal',
                    value: rate + dateRate
                }
                break
            }
        }
    }
    return rateMaster
}