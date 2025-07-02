#!/usr/bin/env python3
"""
Enhanced TypeScript Syntax Repair Script
Targets specific comma-space corruption patterns found in the codebase
"""

import os
import re
import json
import time
from pathlib import Path
from typing import List, Dict, Tuple

class EnhancedTypeScriptRepairer:
    def __init__(self, src_directory: str = "src"):
        self.src_directory = src_directory
        self.repair_count = 0
        self.files_processed = 0
        self.repair_log = []
        
        # Enhanced repair patterns targeting comma-space corruption
        self.repair_patterns = [
            # Core identifier repairs - most common corruption
            (r'\bmai, n\b', 'main'),
            (r'\bconfi, g\b', 'config'), 
            (r'\binstanc, e\b', 'instance'),
            (r'\bagen, t\b', 'agent'),
            (r'\blogg, e\b', 'logger'),
            (r'\btool, s\b', 'tools'),
            (r'\bmessag, e\b', 'message'),
            (r'\bmessage, s\b', 'messages'),
            (r'\bstatu, s\b', 'status'),
            (r'\berro, r\b', 'error'),
            (r'\bmetric, s\b', 'metrics'),
            (r'\bcontex, t\b', 'context'),
            (r'\bsessio, n\b', 'session'),
            (r'\bversio, n\b', 'version'),
            (r'\bfunctio, n\b', 'function'),
            (r'\bconstructor, \b', 'constructor'),
            (r'\bclassNam, e\b', 'className'),
            (r'\bproperti, e\b', 'property'),
            (r'\bresponse, \b', 'response'),
            (r'\breques, t\b', 'request'),
            (r'\bservic, e\b', 'service'),
            (r'\bmodul, e\b', 'module'),
            (r'\bvalu, e\b', 'value'),
            (r'\btim, e\b', 'time'),
            (r'\bdat, a\b', 'data'),
            (r'\bresul, t\b', 'result'),
            (r'\boptio, n\b', 'option'),
            (r'\bparam, s\b', 'params'),
            (r'\bmetadat, a\b', 'metadata'),
            (r'\btyp, e\b', 'type'),
            (r'\bnam, e\b', 'name'),
            (r'\bpath, \b', 'path'),
            (r'\burl, \b', 'url'),
            (r'\bmethod, \b', 'method'),
            (r'\bheader, s\b', 'headers'),
            (r'\bbod, y\b', 'body'),
            (r'\bkey, s\b', 'keys'),
            (r'\bvalu, es\b', 'values'),
            (r'\bitems, \b', 'items'),
            (r'\blengt, h\b', 'length'),
            (r'\bsiz, e\b', 'size'),
            (r'\bcount, \b', 'count'),
            (r'\bindex, \b', 'index'),
            (r'\bmax, \b', 'max'),
            (r'\bmin, \b', 'min'),
            (r'\bavg, \b', 'avg'),
            (r'\bsum, \b', 'sum'),
            (r'\btotal, \b', 'total'),
            (r'\bfirst, \b', 'first'),
            (r'\blast, \b', 'last'),
            (r'\bnext, \b', 'next'),
            (r'\bprev, \b', 'prev'),
            (r'\bcurrent, \b', 'current'),
            (r'\bdefault, \b', 'default'),
            (r'\binitial, \b', 'initial'),
            (r'\bfinal, \b', 'final'),
            (r'\btemp, \b', 'temp'),
            (r'\btmp, \b', 'tmp'),
            (r'\bbuffer, \b', 'buffer'),
            (r'\bcache, \b', 'cache'),
            (r'\bqueue, \b', 'queue'),
            (r'\bstack, \b', 'stack'),
            (r'\blist, \b', 'list'),
            (r'\barray, \b', 'array'),
            (r'\bmap, \b', 'map'),
            (r'\bset, \b', 'set'),
            (r'\bobject, \b', 'object'),
            (r'\bstring, \b', 'string'),
            (r'\bnumber, \b', 'number'),
            (r'\bboolean, \b', 'boolean'),
            (r'\bdate, \b', 'date'),
            (r'\bregex, \b', 'regex'),
            (r'\bjson, \b', 'json'),
            (r'\bxml, \b', 'xml'),
            (r'\bhtml, \b', 'html'),
            (r'\bcss, \b', 'css'),
            (r'\bjs, \b', 'js'),
            (r'\bts, \b', 'ts'),
            (r'\bnode, \b', 'node'),
            (r'\bnpm, \b', 'npm'),
            (r'\byarn, \b', 'yarn'),
            (r'\bpnpm, \b', 'pnpm'),
            (r'\bexpress, \b', 'express'),
            (r'\bfastify, \b', 'fastify'),
            (r'\bnext, js\b', 'nextjs'),
            (r'\breact, \b', 'react'),
            (r'\bvue, \b', 'vue'),
            (r'\bangular, \b', 'angular'),
            (r'\bapi, \b', 'api'),
            (r'\brest, \b', 'rest'),
            (r'\bgraphql, \b', 'graphql'),
            (r'\btrpc, \b', 'trpc'),
            (r'\bauth, \b', 'auth'),
            (r'\bjwt, \b', 'jwt'),
            (r'\boauth, \b', 'oauth'),
            (r'\bsql, \b', 'sql'),
            (r'\bmongo, \b', 'mongo'),
            (r'\bredis, \b', 'redis'),
            (r'\bpg, \b', 'pg'),
            (r'\bmysql, \b', 'mysql'),
            (r'\bsqlite, \b', 'sqlite'),
            (r'\btag, \b', 'tag'),
            (r'\blabel, \b', 'label'),
            (r'\bflag, \b', 'flag'),
            (r'\bmode, \b', 'mode'),
            (r'\bstate, \b', 'state'),
            (r'\baction, \b', 'action'),
            (r'\bevent, \b', 'event'),
            (r'\bhandler, \b', 'handler'),
            (r'\blistener, \b', 'listener'),
            (r'\bcallback, \b', 'callback'),
            (r'\bpromise, \b', 'promise'),
            (r'\basync, \b', 'async'),
            (r'\bawait, \b', 'await'),
            (r'\bthen, \b', 'then'),
            (r'\bcatch, \b', 'catch'),
            (r'\bfinally, \b', 'finally'),
            (r'\btry, \b', 'try'),
            (r'\bthrow, \b', 'throw'),
            (r'\breturn, \b', 'return'),
            (r'\byield, \b', 'yield'),
            (r'\bbreak, \b', 'break'),
            (r'\bcontinue, \b', 'continue'),
            (r'\bswitch, \b', 'switch'),
            (r'\bcase, \b', 'case'),
            (r'\bdefault, \b', 'default'),
            (r'\bif, \b', 'if'),
            (r'\belse, \b', 'else'),
            (r'\belseif, \b', 'elseif'),
            (r'\bfor, \b', 'for'),
            (r'\bwhile, \b', 'while'),
            (r'\bdo, \b', 'do'),
            (r'\bforeach, \b', 'foreach'),
            (r'\bin, \b', 'in'),
            (r'\bof, \b', 'of'),
            (r'\bwith, \b', 'with'),
            (r'\bgenerator, \b', 'generator'),
            (r'\biterator, \b', 'iterator'),
            (r'\biterable, \b', 'iterable'),
            (r'\bsymbol, \b', 'symbol'),
            (r'\bproxy, \b', 'proxy'),
            (r'\breflect, \b', 'reflect'),
            (r'\bweakmap, \b', 'weakmap'),
            (r'\bweakset, \b', 'weakset'),
            (r'\barrayBuffer, \b', 'arrayBuffer'),
            (r'\bdataView, \b', 'dataView'),
            (r'\btypedArray, \b', 'typedArray'),
            (r'\bint8Array, \b', 'int8Array'),
            (r'\buint8Array, \b', 'uint8Array'),
            (r'\bint16Array, \b', 'int16Array'),
            (r'\buint16Array, \b', 'uint16Array'),
            (r'\bint32Array, \b', 'int32Array'),
            (r'\buint32Array, \b', 'uint32Array'),
            (r'\bfloat32Array, \b', 'float32Array'),
            (r'\bfloat64Array, \b', 'float64Array'),
            (r'\bbigInt64Array, \b', 'bigInt64Array'),
            (r'\bbigUint64Array, \b', 'bigUint64Array'),
            (r'\bsharedArrayBuffer, \b', 'sharedArrayBuffer'),
            (r'\batomics, \b', 'atomics'),
            
            # Property access corruption patterns 
            (r'process\.en, v', 'process.env'),
            (r'process\.ex, it', 'process.exit'),
            (r'Date\.no, w', 'Date.now'),
            (r'JSON\.stringif, y', 'JSON.stringify'),
            (r'JSON\.pars, e', 'JSON.parse'),
            (r'Object\.key, s', 'Object.keys'),
            (r'Object\.value, s', 'Object.values'),
            (r'Object\.entrie, s', 'Object.entries'),
            (r'Array\.fro, m', 'Array.from'),
            (r'Array\.isArra, y', 'Array.isArray'),
            (r'Math\.ma, x', 'Math.max'),
            (r'Math\.mi, n', 'Math.min'),
            (r'Math\.floo, r', 'Math.floor'),
            (r'Math\.cei, l', 'Math.ceil'),
            (r'Math\.roun, d', 'Math.round'),
            (r'Math\.rando, m', 'Math.random'),
            (r'console\.lo, g', 'console.log'),
            (r'console\.erro, r', 'console.error'),
            (r'console\.war, n', 'console.warn'),
            (r'console\.inf, o', 'console.info'),
            (r'console\.debu, g', 'console.debug'),
            (r'console\.trac, e', 'console.trace'),
            (r'Buffer\.fro, m', 'Buffer.from'),
            
            # Method call corruption patterns
            (r'\.initializ, e\(', '.initialize('),
            (r'\.execut, e\(', '.execute('),
            (r'\.creat, e\(', '.create('),
            (r'\.buil, d\(', '.build('),
            (r'\.proces, s\(', '.process('),
            (r'\.handl, e\(', '.handle('),
            (r'\.updat, e\(', '.update('),
            (r'\.delet, e\(', '.delete('),
            (r'\.remov, e\(', '.remove('),
            (r'\.ad, d\(', '.add('),
            (r'\.pus, h\(', '.push('),
            (r'\.po, p\(', '.pop('),
            (r'\.shif, t\(', '.shift('),
            (r'\.unshif, t\(', '.unshift('),
            (r'\.slic, e\(', '.slice('),
            (r'\.splic, e\(', '.splice('),
            (r'\.joi, n\(', '.join('),
            (r'\.spli, t\(', '.split('),
            (r'\.replac, e\(', '.replace('),
            (r'\.matc, h\(', '.match('),
            (r'\.searc, h\(', '.search('),
            (r'\.indexO, f\(', '.indexOf('),
            (r'\.lastIndexO, f\(', '.lastIndexOf('),
            (r'\.include, s\(', '.includes('),
            (r'\.startsWith\(', '.startsWith('),
            (r'\.endsWith\(', '.endsWith('),
            (r'\.toLowerCas, e\(', '.toLowerCase('),
            (r'\.toUpperCas, e\(', '.toUpperCase('),
            (r'\.tri, m\(', '.trim('),
            (r'\.trimStar, t\(', '.trimStart('),
            (r'\.trimEn, d\(', '.trimEnd('),
            (r'\.padStar, t\(', '.padStart('),
            (r'\.padEn, d\(', '.padEnd('),
            (r'\.substrin, g\(', '.substring('),
            (r'\.subst, r\(', '.substr('),
            (r'\.charAt, \(', '.charAt('),
            (r'\.charCodeA, t\(', '.charCodeAt('),
            (r'\.fromCharCod, e\(', '.fromCharCode('),
            (r'\.localeCompar, e\(', '.localeCompare('),
            (r'\.normalize, \(', '.normalize('),
            (r'\.repeat, \(', '.repeat('),
            (r'\.ge, t\(', '.get('),
            (r'\.se, t\(', '.set('),
            (r'\.ha, s\(', '.has('),
            (r'\.clea, r\(', '.clear('),
            (r'\.valu, e\(', '.value('),
            (r'\.key, s\(', '.keys('),
            (r'\.entrie, s\(', '.entries('),
            (r'\.forEac, h\(', '.forEach('),
            (r'\.ma, p\(', '.map('),
            (r'\.filte, r\(', '.filter('),
            (r'\.reduc, e\(', '.reduce('),
            (r'\.reduceRigh, t\(', '.reduceRight('),
            (r'\.fin, d\(', '.find('),
            (r'\.findInde, x\(', '.findIndex('),
            (r'\.ever, y\(', '.every('),
            (r'\.som, e\(', '.some('),
            (r'\.sor, t\(', '.sort('),
            (r'\.revers, e\(', '.reverse('),
            (r'\.toStrin, g\(', '.toString('),
            (r'\.valueO, f\(', '.valueOf('),
            (r'\.toISOStrin, g\(', '.toISOString('),
            (r'\.toDateStrin, g\(', '.toDateString('),
            (r'\.toTimeStrin, g\(', '.toTimeString('),
            (r'\.toLocaleStrin, g\(', '.toLocaleString('),
            (r'\.toLocaleDateStrin, g\(', '.toLocaleDateString('),
            (r'\.toLocaleTimeStrin, g\(', '.toLocaleTimeString('),
            (r'\.getFullYea, r\(', '.getFullYear('),
            (r'\.getMont, h\(', '.getMonth('),
            (r'\.getDat, e\(', '.getDate('),
            (r'\.getDa, y\(', '.getDay('),
            (r'\.getHour, s\(', '.getHours('),
            (r'\.getMinute, s\(', '.getMinutes('),
            (r'\.getSecond, s\(', '.getSeconds('),
            (r'\.getMillisecond, s\(', '.getMilliseconds('),
            (r'\.getTim, e\(', '.getTime('),
            (r'\.getTimezoneOffse, t\(', '.getTimezoneOffset('),
            (r'\.setFullYea, r\(', '.setFullYear('),
            (r'\.setMont, h\(', '.setMonth('),
            (r'\.setDat, e\(', '.setDate('),
            (r'\.setHour, s\(', '.setHours('),
            (r'\.setMinute, s\(', '.setMinutes('),
            (r'\.setSecond, s\(', '.setSeconds('),
            (r'\.setMillisecond, s\(', '.setMilliseconds('),
            (r'\.setTim, e\(', '.setTime('),
            (r'\.liste, n\(', '.listen('),
            (r'\.us, e\(', '.use('),
            (r'\.ge, t\(', '.get('),
            (r'\.pos, t\(', '.post('),
            (r'\.pu, t\(', '.put('),
            (r'\.patc, h\(', '.patch('),
            (r'\.delet, e\(', '.delete('),
            (r'\.hea, d\(', '.head('),
            (r'\.option, s\(', '.options('),
            (r'\.al, l\(', '.all('),
            (r'\.rou, te\(', '.route('),
            (r'\.rende, r\(', '.render('),
            (r'\.sen, d\(', '.send('),
            (r'\.jso, n\(', '.json('),
            (r'\.redirec, t\(', '.redirect('),
            (r'\.en, d\(', '.end('),
            (r'\.statu, s\(', '.status('),
            (r'\.heade, r\(', '.header('),
            (r'\.cooki, e\(', '.cookie('),
            (r'\.clearCooki, e\(', '.clearCookie('),
            (r'\.typ, e\(', '.type('),
            (r'\.forma, t\(', '.format('),
            (r'\.attachmen, t\(', '.attachment('),
            (r'\.downloa, d\(', '.download('),
            (r'\.sendFil, e\(', '.sendFile('),
            (r'\.sendStatu, s\(', '.sendStatus('),
            (r'\.var, y\(', '.vary('),
            (r'\.ap, p\(', '.app('),
            (r'\.baseUr, l\(', '.baseUrl('),
            (r'\.origina, lUrl\(', '.originalUrl('),
            (r'\.protoco, l\(', '.protocol('),
            (r'\.secur, e\(', '.secure('),
            (r'\.ip, \(', '.ip('),
            (r'\.ip, s\(', '.ips('),
            (r'\.subdomain, s\(', '.subdomains('),
            (r'\.pat, h\(', '.path('),
            (r'\.hostnam, e\(', '.hostname('),
            (r'\.hos, t\(', '.host('),
            (r'\.fres, h\(', '.fresh('),
            (r'\.stal, e\(', '.stale('),
            (r'\.xh, r\(', '.xhr('),
            (r'\.quer, y\(', '.query('),
            (r'\.param, s\(', '.params('),
            (r'\.param, \(', '.param('),
            (r'\.i, s\(', '.is('),
            (r'\.accept, s\(', '.accepts('),
            (r'\.acceptsCharset, s\(', '.acceptsCharsets('),
            (r'\.acceptsEncoding, s\(', '.acceptsEncodings('),
            (r'\.acceptsLanguage, s\(', '.acceptsLanguages('),
            (r'\.rang, e\(', '.range('),
            (r'\.clen, g\(', '.cleng('),
            (r'\.cleng, \(', '.cleng('),
            (r'\.len, \(', '.len('),
            (r'\.lengt, h\(', '.length('),
            (r'\.siz, e\(', '.size('),
            (r'\.o, n\(', '.on('),
            (r'\.onc, e\(', '.once('),
            (r'\.of, f\(', '.off('),
            (r'\.emit, \(', '.emit('),
            (r'\.removeListener, \(', '.removeListener('),
            (r'\.removeAllListener, s\(', '.removeAllListeners('),
            (r'\.setMaxListener, s\(', '.setMaxListeners('),
            (r'\.getMaxListener, s\(', '.getMaxListeners('),
            (r'\.listener, s\(', '.listeners('),
            (r'\.rawListener, s\(', '.rawListeners('),
            (r'\.listenerCoun, t\(', '.listenerCount('),
            (r'\.prependListener, \(', '.prependListener('),
            (r'\.prependOnceListener, \(', '.prependOnceListener('),
            (r'\.eventName, s\(', '.eventNames('),
            
            # Variable declarations and assignments
            (r'\bconst\s+([a-zA-Z_$][a-zA-Z0-9_$]*), \s*([a-zA-Z_$][a-zA-Z0-9_$]*)', r'const \1\2'),
            (r'\blet\s+([a-zA-Z_$][a-zA-Z0-9_$]*), \s*([a-zA-Z_$][a-zA-Z0-9_$]*)', r'let \1\2'),
            (r'\bvar\s+([a-zA-Z_$][a-zA-Z0-9_$]*), \s*([a-zA-Z_$][a-zA-Z0-9_$]*)', r'var \1\2'),
            
            # Function parameters split by comma-space
            (r'\(([a-zA-Z_$][a-zA-Z0-9_$]*), \s*([a-zA-Z_$][a-zA-Z0-9_$]*),\s*([a-zA-Z_$][a-zA-Z0-9_$]*)', r'(\1\2, \3'),
            (r'\(([a-zA-Z_$][a-zA-Z0-9_$]*), \s*([a-zA-Z_$][a-zA-Z0-9_$]*)\)', r'(\1\2)'),
            
            # Generic type parameters
            (r'<([a-zA-Z_$][a-zA-Z0-9_$]*), \s*([a-zA-Z_$][a-zA-Z0-9_$]*),', r'<\1\2,'),
            (r'<([a-zA-Z_$][a-zA-Z0-9_$]*), \s*([a-zA-Z_$][a-zA-Z0-9_$]*)>', r'<\1\2>'),
            
            # Object properties split by comma-space
            (r'\{([a-zA-Z_$][a-zA-Z0-9_$]*), \s*([a-zA-Z_$][a-zA-Z0-9_$]*)', r'{\1\2'),
            (r'([a-zA-Z_$][a-zA-Z0-9_$]*), \s*([a-zA-Z_$][a-zA-Z0-9_$]*)\}', r'\1\2}'),
            
            # Import statement corruption
            (r'import\s*\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*), \s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}', r'import { \1\2 }'),
            (r'import\s*\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*),\s*([a-zA-Z_$][a-zA-Z0-9_$]*), \s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}', r'import { \1, \2\3 }'),
            
            # Export statement corruption  
            (r'export\s*\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*), \s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}', r'export { \1\2 }'),
            
            # Class property corruption
            (r'protected\s+([a-zA-Z_$][a-zA-Z0-9_$]*), \s*([a-zA-Z_$][a-zA-Z0-9_$]*)', r'protected \1\2'),
            (r'private\s+([a-zA-Z_$][a-zA-Z0-9_$]*), \s*([a-zA-Z_$][a-zA-Z0-9_$]*)', r'private \1\2'),
            (r'public\s+([a-zA-Z_$][a-zA-Z0-9_$]*), \s*([a-zA-Z_$][a-zA-Z0-9_$]*)', r'public \1\2'),
            (r'static\s+([a-zA-Z_$][a-zA-Z0-9_$]*), \s*([a-zA-Z_$][a-zA-Z0-9_$]*)', r'static \1\2'),
            (r'readonly\s+([a-zA-Z_$][a-zA-Z0-9_$]*), \s*([a-zA-Z_$][a-zA-Z0-9_$]*)', r'readonly \1\2'),
            
            # Interface/type corruption
            (r'interface\s+([a-zA-Z_$][a-zA-Z0-9_$]*), \s*([a-zA-Z_$][a-zA-Z0-9_$]*)', r'interface \1\2'),
            (r'type\s+([a-zA-Z_$][a-zA-Z0-9_$]*), \s*([a-zA-Z_$][a-zA-Z0-9_$]*)', r'type \1\2'),
            (r'enum\s+([a-zA-Z_$][a-zA-Z0-9_$]*), \s*([a-zA-Z_$][a-zA-Z0-9_$]*)', r'enum \1\2'),
            (r'class\s+([a-zA-Z_$][a-zA-Z0-9_$]*), \s*([a-zA-Z_$][a-zA-Z0-9_$]*)', r'class \1\2'),
            
            # Template literal corruption
            (r'\$\{([a-zA-Z_$][a-zA-Z0-9_$]*), \s*([a-zA-Z_$][a-zA-Z0-9_$]*)\}', r'${\1\2}'),
            
            # Arrow function corruption
            (r'(\([^)]*\))\s*=>, \s*', r'\1 => '),
            (r'([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=>, \s*', r'\1 => '),
            
            # Promise/async corruption
            (r'\.the, n\(', '.then('),
            (r'\.catc, h\(', '.catch('),
            (r'\.finall, y\(', '.finally('),
            
            # Common TypeScript types
            (r'\bstrin, g\b', 'string'),
            (r'\bnumbe, r\b', 'number'),
            (r'\bboolea, n\b', 'boolean'),
            (r'\bundefine, d\b', 'undefined'),
            (r'\bnul, l\b', 'null'),
            (r'\bvoi, d\b', 'void'),
            (r'\ban, y\b', 'any'),
            (r'\bunknow, n\b', 'unknown'),
            (r'\bneve, r\b', 'never'),
            (r'\bobject, \b', 'object'),
            (r'\bsymbo, l\b', 'symbol'),
            (r'\bbigint, \b', 'bigint'),
            
            # Final catch-all for remaining comma-space in identifiers
            (r'\b([a-zA-Z_$][a-zA-Z0-9_$]*), ([a-zA-Z_$][a-zA-Z0-9_$]*)\b', r'\1\2'),
        ]

    def backup_file(self, file_path: str) -> str:
        """Create a backup of the original file"""
        backup_path = f"{file_path}.backup_{int(time.time())}"
        with open(file_path, 'r', encoding='utf-8') as original:
            with open(backup_path, 'w', encoding='utf-8') as backup:
                backup.write(original.read())
        return backup_path

    def repair_file(self, file_path: str) -> Dict:
        """Repair a single TypeScript file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                original_content = f.read()
            
            if not original_content.strip():
                return {"repaired": False, "reason": "Empty file"}
            
            # Create backup
            backup_path = self.backup_file(file_path)
            
            repaired_content = original_content
            repairs_made = 0
            
            # Apply all repair patterns
            for pattern, replacement in self.repair_patterns:
                matches = re.findall(pattern, repaired_content)
                if matches:
                    repaired_content = re.sub(pattern, replacement, repaired_content)
                    repairs_made += len(matches)
            
            # Write repaired content if changes were made
            if repairs_made > 0:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(repaired_content)
                
                self.repair_count += repairs_made
                
                repair_info = {
                    "file": file_path,
                    "repairs_made": repairs_made,
                    "backup_path": backup_path,
                    "repaired": True
                }
                self.repair_log.append(repair_info)
                return repair_info
            else:
                # Remove backup if no repairs were needed
                os.remove(backup_path)
                return {"repaired": False, "reason": "No repairs needed"}
                
        except Exception as e:
            return {"repaired": False, "reason": f"Error: {str(e)}"}

    def find_typescript_files(self) -> List[str]:
        """Find all TypeScript files in the source directory"""
        typescript_files = []
        for root, dirs, files in os.walk(self.src_directory):
            for file in files:
                if file.endswith(('.ts', '.tsx')):
                    typescript_files.append(os.path.join(root, file))
        return typescript_files

    def repair_all_files(self) -> Dict:
        """Repair all TypeScript files"""
        typescript_files = self.find_typescript_files()
        
        print(f"Found {len(typescript_files)} TypeScript files to process...")
        
        results = {
            "total_files": len(typescript_files),
            "files_processed": 0,
            "files_repaired": 0,
            "total_repairs": 0,
            "failed_files": [],
            "repaired_files": []
        }
        
        for file_path in typescript_files:
            self.files_processed += 1
            result = self.repair_file(file_path)
            
            if result.get("repaired", False):
                results["files_repaired"] += 1
                results["repaired_files"].append(result)
                print(f"✅ Repaired {file_path}: {result['repairs_made']} fixes")
            elif "Error" in result.get("reason", ""):
                results["failed_files"].append({"file": file_path, "reason": result["reason"]})
                print(f"❌ Failed {file_path}: {result['reason']}")
            else:
                print(f"⏭️  Skipped {file_path}: {result['reason']}")
            
            results["files_processed"] += 1
        
        results["total_repairs"] = self.repair_count
        return results

def main():
    print("🔧 Enhanced TypeScript Syntax Repair Tool")
    print("==========================================")
    
    repairer = EnhancedTypeScriptRepairer()
    
    # Run the repair process
    start_time = time.time()
    results = repairer.repair_all_files()
    end_time = time.time()
    
    # Generate report
    print(f"\n📊 Repair Summary:")
    print(f"   Total files found: {results['total_files']}")
    print(f"   Files processed: {results['files_processed']}")
    print(f"   Files repaired: {results['files_repaired']}")
    print(f"   Total repairs made: {results['total_repairs']}")
    print(f"   Processing time: {end_time - start_time:.2f} seconds")
    
    if results['failed_files']:
        print(f"\n❌ Failed files ({len(results['failed_files'])}):")
        for failed in results['failed_files']:
            print(f"   {failed['file']}: {failed['reason']}")
    
    # Save detailed report
    report_file = f"enhanced_repair_report_{int(time.time())}.json"
    with open(report_file, 'w') as f:
        json.dump({
            "summary": results,
            "repair_log": repairer.repair_log,
            "timestamp": time.time(),
            "duration": end_time - start_time
        }, f, indent=2)
    
    print(f"\n📄 Detailed report saved to: {report_file}")
    
    if results['files_repaired'] > 0:
        print(f"\n✅ Enhanced repair completed successfully!")
        print(f"   Run 'npm run type-check' to validate TypeScript compilation")
    else:
        print(f"\n⚠️  No files needed repair")

if __name__ == "__main__":
    main()