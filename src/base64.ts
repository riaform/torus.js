export module base64
{
    class Base64
    {
        private static _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

        public static encode(input : string) : string  {
            var output = "";
            var i = 0;
            
            input = this._utf8_encode(input);
            while (i < input.length) {
                var chr1 = input.charCodeAt(i++);
                var chr2 = input.charCodeAt(i++);
                var chr3 = input.charCodeAt(i++);
                var enc1 = chr1 >> 2;
                var enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                var enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                var enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) enc4 = 64;
                output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
            }
            return output;
        }

        public static decode(input:string) : string {
            var output = "";
            var i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i < input.length) {
                var enc1 = this._keyStr.indexOf(input.charAt(i++));
                var enc2 = this._keyStr.indexOf(input.charAt(i++));
                var enc3 = this._keyStr.indexOf(input.charAt(i++));
                var enc4 = this._keyStr.indexOf(input.charAt(i++));
                var chr1 = (enc1 << 2) | (enc2 >> 4);
                var chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                var chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 !== 64) output = output + String.fromCharCode(chr2);
                if (enc4 !== 64) output = output + String.fromCharCode(chr3);
            }
            output = this._utf8_decode(output);
            return output;
        }

        private static _utf8_encode(input:string):string {
            input = input.replace(/\r\n/g, "\n");
            var utftext = "";
            
            for (var n =0; n<input.length; n++)
            {
                var c = input.charCodeAt(n);
                if (c < 128) {
                   utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
        }

        private static _utf8_decode(utftext:string):string {
            var ret = "";
            var i = 0;
            var c = 0, c1 = 0, c2 = 0;
            while (i < utftext.length) {
                var c = utftext.charCodeAt(i);
                if (c < 128) {
                    ret += String.fromCharCode(c);
                    i++;
                } else if ((c > 191) && (c < 224)) {
                    var c2 = utftext.charCodeAt(i + 1);
                    ret += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                } else {
                    var c2 = utftext.charCodeAt(i + 1);
                    var c3 = utftext.charCodeAt(i + 2);
                    ret += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return ret;
        }
    }

}