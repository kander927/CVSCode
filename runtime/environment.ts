import {
    isPrimeFunction,
    isIntFunction
} from "./native/Checks.ts";

import {
    rndFunction,
    sqrtFunction,
    powFunction,
    roundFunction,
    absFunction,
    ceilFunction,
    floorFunction,
    minFunction,
    maxFunction,
    expFunction,
    sinFunction,
    cosFunction,
    tanFunction,
    asinFunction,
    acosFunction,
    atanFunction,
    sinhFunction,
    coshFunction,
    tanhFunction,
    expm1Function,
    log10Function,
    sqrFunction,
    cubicFunction,
    pow10Function,
    atan2Function,
    hypotFunction,
    truncFunction,
    signFunction,
    randIntFunction,
    degToRadFunction,
    gcdFunction,
    factorialFunction,
    fibonacciFunction,
    meanFunction,
    medianFunction
} from "./native/Math.ts";

import {
    strLenFunction,
    strIncludesFunction,
    strEndsWithFunction,
    strStartsWithFunction,
    strToUppercaseFunction,
    strToLowerCaseFunction,
    strReverseFunction,
    strTrimFunction,
    strCharAtFunction,
    strNormalizeFunction,
    strTrimStartFunction,
    strTrimEndFunction,
    strReplaceFunction,
    strReplaceAllFunction,
    strRepeatFunction
} from "./native/String.ts";

import {
    printFunction,
    printlnFunction,
    timeFunction
} from "./native/core.ts";

import {
    MK_BOOL,
    MK_NATIVE_FN,
    MK_NULL,
    RuntimeVal
} from "./values.ts";

export function createGlobalEnv() {
    const env = new Environment();

    env.declareVar("true", MK_BOOL(true), true);
    env.declareVar("false", MK_BOOL(false), true);
    env.declareVar("null", MK_NULL(), true);

    // define native built-in functions
    env.declareVar("print", MK_NATIVE_FN(printFunction), true);
    env.declareVar("println", MK_NATIVE_FN(printlnFunction), true);
    env.declareVar("time", MK_NATIVE_FN(timeFunction), true);

    
    // MATH
    env.declareVar("random", MK_NATIVE_FN(rndFunction), true);
    env.declareVar("sqrt", MK_NATIVE_FN(sqrtFunction), true);
    env.declareVar("pow", MK_NATIVE_FN(powFunction), true);
    env.declareVar("round", MK_NATIVE_FN(roundFunction), true);
    env.declareVar("abs", MK_NATIVE_FN(absFunction), true);
    env.declareVar("ceil", MK_NATIVE_FN(ceilFunction), true);
    env.declareVar("floor", MK_NATIVE_FN(floorFunction), true);
    env.declareVar("min", MK_NATIVE_FN(minFunction), true);
    env.declareVar("max", MK_NATIVE_FN(maxFunction), true);
    env.declareVar("exp", MK_NATIVE_FN(expFunction), true);
    env.declareVar("sin", MK_NATIVE_FN(sinFunction), true);
    env.declareVar("cos", MK_NATIVE_FN(cosFunction), true);
    env.declareVar("tan", MK_NATIVE_FN(tanFunction), true);
    env.declareVar("asin", MK_NATIVE_FN(asinFunction), true);
    env.declareVar("acos", MK_NATIVE_FN(acosFunction), true);
    env.declareVar("atan", MK_NATIVE_FN(atanFunction), true);
    env.declareVar("sinh", MK_NATIVE_FN(sinhFunction), true);
    env.declareVar("cosh", MK_NATIVE_FN(coshFunction), true);
    env.declareVar("tanh", MK_NATIVE_FN(tanhFunction), true);
    env.declareVar("expm1", MK_NATIVE_FN(expm1Function), true);
    env.declareVar("log10", MK_NATIVE_FN(log10Function), true);
    env.declareVar("sqr", MK_NATIVE_FN(sqrFunction), true);
    env.declareVar("cubic", MK_NATIVE_FN(cubicFunction), true);
    env.declareVar("pow10", MK_NATIVE_FN(pow10Function), true);
    env.declareVar("atan2", MK_NATIVE_FN(atan2Function), true);
    env.declareVar("hypot", MK_NATIVE_FN(hypotFunction), true);
    env.declareVar("trunc", MK_NATIVE_FN(truncFunction), true);
    env.declareVar("sgn", MK_NATIVE_FN(signFunction), true);
    env.declareVar("randint", MK_NATIVE_FN(randIntFunction), true);
    env.declareVar("degToRad", MK_NATIVE_FN(degToRadFunction), true);
    env.declareVar("gcd", MK_NATIVE_FN(gcdFunction), true);
    env.declareVar("factorial", MK_NATIVE_FN(factorialFunction), true);
    env.declareVar("isPrime", MK_NATIVE_FN(isPrimeFunction), true);
    env.declareVar("fibonacci", MK_NATIVE_FN(fibonacciFunction), true);
    env.declareVar("mean", MK_NATIVE_FN(meanFunction), true);
    env.declareVar("median", MK_NATIVE_FN(medianFunction), true);
    env.declareVar("isInt", MK_NATIVE_FN(isIntFunction), true);

    // STRING
    env.declareVar("strLen", MK_NATIVE_FN(strLenFunction), true);
    env.declareVar("strIncludes", MK_NATIVE_FN(strIncludesFunction), true);
    env.declareVar("strEndsWith", MK_NATIVE_FN(strEndsWithFunction), true);
    env.declareVar("strStartsWith", MK_NATIVE_FN(strStartsWithFunction), true);
    env.declareVar("strToUppercase", MK_NATIVE_FN(strToUppercaseFunction), true);
    env.declareVar("strToLowerCase", MK_NATIVE_FN(strToLowerCaseFunction), true);
    env.declareVar("strReverse", MK_NATIVE_FN(strReverseFunction), true);
    env.declareVar("strTrim", MK_NATIVE_FN(strTrimFunction), true);
    env.declareVar("strCharAt", MK_NATIVE_FN(strCharAtFunction), true);
    env.declareVar("strNormalize", MK_NATIVE_FN(strNormalizeFunction), true);
    env.declareVar("strTrimStart", MK_NATIVE_FN(strTrimStartFunction), true);
    env.declareVar("strTrimEnd", MK_NATIVE_FN(strTrimEndFunction), true);
    env.declareVar("strReplace", MK_NATIVE_FN(strReplaceFunction), true);
    env.declareVar("strReplaceAll", MK_NATIVE_FN(strReplaceAllFunction), true);
    env.declareVar("strRepeat", MK_NATIVE_FN(strRepeatFunction), true);

    return env;
}

export default class Environment {

    private parent?: Environment;
    private variables: Map<string, RuntimeVal>;
    private constants: Set<string>;

    constructor (parentENV?: Environment) {
        this.parent = parentENV;
        this.variables = new Map();
        this.constants = new Set();
    }

    public declareVar (
        varname: string,
        value: RuntimeVal,
        constant: boolean
    ): RuntimeVal {
        if (this.variables.has(varname)) {
            throw `Cannot declare variable ${varname}. As it already is defined.`;
        }

        this.variables.set(varname, value);
        
        if(constant) {
            this.constants.add(varname);
        }

        return value;
    }

    public assignVar (varname: string, value: RuntimeVal): RuntimeVal {
        const env = this.resolve(varname);
        
        if(env.constants.has(varname)) {
            throw `Cannot assign value to constant ${varname}.`;
        }

        env.variables.set(varname, value);

        return value;
    }

    public lookupVar (varname: string): RuntimeVal {
        const env = this.resolve(varname);

        return env.variables.get(varname) as RuntimeVal;
    }

    public resolve (varname: string): Environment {
        if (this.variables.has(varname)) {
            return this;
        }

        if(this.parent == undefined) {
            throw `Cannot resolve '${varname}' as it does not exist.`;
        }

        return this.parent.resolve(varname);
    }
}