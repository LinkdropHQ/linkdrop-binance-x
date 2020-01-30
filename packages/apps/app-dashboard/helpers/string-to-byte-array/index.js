export default ({ string }) => {
    if (string === '' || string === null || string === undefined) {
        return new Uint8Array();
    }
    if (string.length % 2 !== 0) {
        throw new Error('invalid string size');
    }
    if (string.indexOf('0x') === 0) {
        string = string.substring(2);
    }
    return new Uint8Array(string.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
}