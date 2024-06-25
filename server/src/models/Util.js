export default class Util {

    sanitizeInput(input) {
        console.log('Input to sanitize is: ', input);
        // Use a regular expression to replace potentially harmful characters
        const sanitizedInput = input.replace(/[&<>"'/\\]/g, (match) => {
            // Replace each matched character with its corresponding HTML entity
            const replacements = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;', // &apos; is not recommended in HTML
                '/': '&#x2F;',
                '\\': '&#x5C;'
            };
            return replacements[match];
        });
      
        return sanitizedInput;
    }
    getCurrentTimestampZ() {
        const date = new Date();
        const timezoneOffsetMinutes = date.getTimezoneOffset();
        const sign = timezoneOffsetMinutes < 0 ? '+' : '-';
        const hoursOffset = Math.abs(Math.floor(timezoneOffsetMinutes / 60)).toString().padStart(2, '0');
        const minutesOffset = Math.abs(timezoneOffsetMinutes % 60).toString().padStart(2, '0');
        const timezoneOffsetFormatted = `${sign}${hoursOffset}:${minutesOffset}`;
        const timestampWithTimeZone = date.toISOString().replace('Z', timezoneOffsetFormatted);
        return timestampWithTimeZone;
    }
    calculateTimeDifference_Hour(timestamp1, timestamp2) {
        const date1 = new Date(timestamp1);
        const date2 = new Date(timestamp2);
      
        // Calculate the difference in milliseconds
        const timeDifferenceMs = Math.abs(date2 - date1);
      
        // Convert milliseconds to hours
        const hourDifference = timeDifferenceMs / (1000 * 60 * 60);
      
        return hourDifference;
      }
}