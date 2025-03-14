/* eslint-disable */
const BigInteger = (function () {
  'use strict'
  // Bits per digit
  let dbits
  // JavaScript engine analysis
  const canary = 0xdeadbeefcafe
  const j_lm = ((canary & 0xffffff) == 0xefcafe)

  // (public) Constructor
  function BigInteger (a, b, c) {
    if (a != null) {
      if (typeof a === 'number') this.fromNumber(a, b, c)
      else if (b == null && typeof a !== 'string') this.fromString(a, 256)
      else this.fromString(a, b)
    }
  }

  // return new, unset BigInteger
  function nbi () { return new BigInteger(null) }

  function am1 (i, x, w, j, c, n) {
    while (--n >= 0) {
      const v = x * this[i++] + w[j] + c
      c = Math.floor(v / 0x4000000)
      w[j++] = v & 0x3ffffff
    }
    return c
  }

  function am2 (i, x, w, j, c, n) {
    const xl = x & 0x7fff; const xh = x >> 15
    while (--n >= 0) {
      let l = this[i] & 0x7fff
      const h = this[i++] >> 15
      const m = xh * l + h * xl
      l = xl * l + ((m & 0x7fff) << 15) + w[j] + (c & 0x3fffffff)
      c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30)
      w[j++] = l & 0x3fffffff
    }
    return c
  }

  function am3 (i, x, w, j, c, n) {
    const xl = x & 0x3fff; const xh = x >> 14
    while (--n >= 0) {
      let l = this[i] & 0x3fff
      const h = this[i++] >> 14
      const m = xh * l + h * xl
      l = xl * l + ((m & 0x3fff) << 14) + w[j] + c
      c = (l >> 28) + (m >> 14) + xh * h
      w[j++] = l & 0xfffffff
    }
    return c
  }

  if (j_lm && typeof window !== 'undefined' && (navigator.appName == 'Microsoft Internet Explorer')) {
    BigInteger.prototype.am = am2
    dbits = 30
  } else if (j_lm && typeof window !== 'undefined' && (navigator.appName != 'Netscape')) {
    BigInteger.prototype.am = am1
    dbits = 26
  } else { // Mozilla/Netscape seems to prefer am3
    BigInteger.prototype.am = am3
    dbits = 28
  }

  BigInteger.prototype.DB = dbits
  BigInteger.prototype.DM = ((1 << dbits) - 1)
  BigInteger.prototype.DV = (1 << dbits)

  const BI_FP = 52
  BigInteger.prototype.FV = Math.pow(2, BI_FP)
  BigInteger.prototype.F1 = BI_FP - dbits
  BigInteger.prototype.F2 = 2 * dbits - BI_FP

  // Digit conversions
  const BI_RM = '0123456789abcdefghijklmnopqrstuvwxyz'
  const BI_RC = new Array()
  let rr, vv
  rr = '0'.charCodeAt(0)
  for (vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv
  rr = 'a'.charCodeAt(0)
  for (vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv
  rr = 'A'.charCodeAt(0)
  for (vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv

  function int2char (n) { return BI_RM.charAt(n) }
  function intAt (s, i) {
    const c = BI_RC[s.charCodeAt(i)]
    return (c == null) ? -1 : c
  }

  // (protected) copy this to r
  function bnpCopyTo (r) {
    for (var i = this.t - 1; i >= 0; --i) r[i] = this[i]
    r.t = this.t
    r.s = this.s
  }

  // (protected) set from integer value x, -DV <= x < DV
  function bnpFromInt (x) {
    this.t = 1
    this.s = (x < 0) ? -1 : 0
    if (x > 0) this[0] = x
    else if (x < -1) this[0] = x + this.DV
    else this.t = 0
  }

  // return bigint initialized to value
  function nbv (i) { var r = nbi(); r.fromInt(i); return r }

  // (protected) set from string and radix
  function bnpFromString (s, b) {
    var k
    if (b == 16) k = 4
    else if (b == 8) k = 3
    else if (b == 256) k = 8 // byte array
    else if (b == 2) k = 1
    else if (b == 32) k = 5
    else if (b == 4) k = 2
    else { this.fromRadix(s, b); return }
    this.t = 0
    this.s = 0
    var i = s.length; var mi = false; var sh = 0
    while (--i >= 0) {
      var x = (k == 8) ? s[i] & 0xff : intAt(s, i)
      if (x < 0) {
        if (s.charAt(i) == '-') mi = true
        continue
      }
      mi = false
      if (sh == 0) { this[this.t++] = x } else if (sh + k > this.DB) {
        this[this.t - 1] |= (x & ((1 << (this.DB - sh)) - 1)) << sh
        this[this.t++] = (x >> (this.DB - sh))
      } else { this[this.t - 1] |= x << sh }
      sh += k
      if (sh >= this.DB) sh -= this.DB
    }
    if (k == 8 && (s[0] & 0x80) != 0) {
      this.s = -1
      if (sh > 0) this[this.t - 1] |= ((1 << (this.DB - sh)) - 1) << sh
    }
    this.clamp()
    if (mi) BigInteger.ZERO.subTo(this, this)
  }

  // (protected) clamp off excess high words
  function bnpClamp () {
    var c = this.s & this.DM
    while (this.t > 0 && this[this.t - 1] == c) --this.t
  }

  // (public) return string representation in given radix
  function bnToString (b) {
    if (this.s < 0) return '-' + this.negate().toString(b)
    var k
    if (b == 16) k = 4
    else if (b == 8) k = 3
    else if (b == 2) k = 1
    else if (b == 32) k = 5
    else if (b == 4) k = 2
    else return this.toRadix(b)
    var km = (1 << k) - 1; var d; var m = false; var r = ''; var i = this.t
    var p = this.DB - (i * this.DB) % k
    if (i-- > 0) {
      if (p < this.DB && (d = this[i] >> p) > 0) { m = true; r = int2char(d) }
      while (i >= 0) {
        if (p < k) {
          d = (this[i] & ((1 << p) - 1)) << (k - p)
          d |= this[--i] >> (p += this.DB - k)
        } else {
          d = (this[i] >> (p -= k)) & km
          if (p <= 0) { p += this.DB; --i }
        }
        if (d > 0) m = true
        if (m) r += int2char(d)
      }
    }
    return m ? r : '0'
  }

  // (public) -this
  function bnNegate () { var r = nbi(); BigInteger.ZERO.subTo(this, r); return r }

  // (public) |this|
  function bnAbs () { return (this.s < 0) ? this.negate() : this }

  // (public) return + if this > a, - if this < a, 0 if equal
  function bnCompareTo (a) {
    var r = this.s - a.s
    if (r != 0) return r
    var i = this.t
    r = i - a.t
    if (r != 0) return r
    while (--i >= 0) if ((r = this[i] - a[i]) != 0) return r
    return 0
  }

  // returns bit length of the integer x
  function nbits (x) {
    var r = 1; var t
    if ((t = x >>> 16) != 0) { x = t; r += 16 }
    if ((t = x >> 8) != 0) { x = t; r += 8 }
    if ((t = x >> 4) != 0) { x = t; r += 4 }
    if ((t = x >> 2) != 0) { x = t; r += 2 }
    if ((t = x >> 1) != 0) { x = t; r += 1 }
    return r
  }

  // (public) return the number of bits in "this"
  function bnBitLength () {
    if (this.t <= 0) return 0
    return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ (this.s & this.DM))
  }

  // (protected) r = this << n*DB
  function bnpDLShiftTo (n, r) {
    var i
    for (i = this.t - 1; i >= 0; --i) r[i + n] = this[i]
    for (i = n - 1; i >= 0; --i) r[i] = 0
    r.t = this.t + n
    r.s = this.s
  }

  // (protected) r = this >> n*DB
  function bnpDRShiftTo (n, r) {
    for (var i = n; i < this.t; ++i) r[i - n] = this[i]
    r.t = Math.max(this.t - n, 0)
    r.s = this.s
  }

  // (protected) r = this << n
  function bnpLShiftTo (n, r) {
    var bs = n % this.DB
    var cbs = this.DB - bs
    var bm = (1 << cbs) - 1
    var ds = Math.floor(n / this.DB); var c = (this.s << bs) & this.DM; var i
    for (i = this.t - 1; i >= 0; --i) {
      r[i + ds + 1] = (this[i] >> cbs) | c
      c = (this[i] & bm) << bs
    }
    for (i = ds - 1; i >= 0; --i) r[i] = 0
    r[ds] = c
    r.t = this.t + ds + 1
    r.s = this.s
    r.clamp()
  }

  // (protected) r = this >> n
  function bnpRShiftTo (n, r) {
    r.s = this.s
    var ds = Math.floor(n / this.DB)
    if (ds >= this.t) { r.t = 0; return }
    var bs = n % this.DB
    var cbs = this.DB - bs
    var bm = (1 << bs) - 1
    r[0] = this[ds] >> bs
    for (var i = ds + 1; i < this.t; ++i) {
      r[i - ds - 1] |= (this[i] & bm) << cbs
      r[i - ds] = this[i] >> bs
    }
    if (bs > 0) r[this.t - ds - 1] |= (this.s & bm) << cbs
    r.t = this.t - ds
    r.clamp()
  }

  // (protected) r = this - a
  function bnpSubTo (a, r) {
    var i = 0; var c = 0; var m = Math.min(a.t, this.t)
    while (i < m) {
      c += this[i] - a[i]
      r[i++] = c & this.DM
      c >>= this.DB
    }
    if (a.t < this.t) {
      c -= a.s
      while (i < this.t) {
        c += this[i]
        r[i++] = c & this.DM
        c >>= this.DB
      }
      c += this.s
    } else {
      c += this.s
      while (i < a.t) {
        c -= a[i]
        r[i++] = c & this.DM
        c >>= this.DB
      }
      c -= a.s
    }
    r.s = (c < 0) ? -1 : 0
    if (c < -1) r[i++] = this.DV + c
    else if (c > 0) r[i++] = c
    r.t = i
    r.clamp()
  }

  // (protected) r = this * a, r != this,a (HAC 14.12)
  // "this" should be the larger one if appropriate.
  function bnpMultiplyTo (a, r) {
    var x = this.abs(); var y = a.abs()
    var i = x.t
    r.t = i + y.t
    while (--i >= 0) r[i] = 0
    for (i = 0; i < y.t; ++i) r[i + x.t] = x.am(0, y[i], r, i, 0, x.t)
    r.s = 0
    r.clamp()
    if (this.s != a.s) BigInteger.ZERO.subTo(r, r)
  }

  // (protected) r = this^2, r != this (HAC 14.16)
  function bnpSquareTo (r) {
    var x = this.abs()
    var i = r.t = 2 * x.t
    while (--i >= 0) r[i] = 0
    for (i = 0; i < x.t - 1; ++i) {
      var c = x.am(i, x[i], r, 2 * i, 0, 1)
      if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
        r[i + x.t] -= x.DV
        r[i + x.t + 1] = 1
      }
    }
    if (r.t > 0) r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1)
    r.s = 0
    r.clamp()
  }

  // (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
  // r != q, this != m.  q or r may be null.
  function bnpDivRemTo (m, q, r) {
    var pm = m.abs()
    if (pm.t <= 0) return
    var pt = this.abs()
    if (pt.t < pm.t) {
      if (q != null) q.fromInt(0)
      if (r != null) this.copyTo(r)
      return
    }
    if (r == null) r = nbi()
    var y = nbi(); var ts = this.s; var ms = m.s
    var nsh = this.DB - nbits(pm[pm.t - 1])	// normalize modulus
    if (nsh > 0) { pm.lShiftTo(nsh, y); pt.lShiftTo(nsh, r) } else { pm.copyTo(y); pt.copyTo(r) }
    var ys = y.t
    var y0 = y[ys - 1]
    if (y0 == 0) return
    var yt = y0 * (1 << this.F1) + ((ys > 1) ? y[ys - 2] >> this.F2 : 0)
    var d1 = this.FV / yt; var d2 = (1 << this.F1) / yt; var e = 1 << this.F2
    var i = r.t; var j = i - ys; var t = (q == null) ? nbi() : q
    y.dlShiftTo(j, t)
    if (r.compareTo(t) >= 0) {
      r[r.t++] = 1
      r.subTo(t, r)
    }
    BigInteger.ONE.dlShiftTo(ys, t)
    t.subTo(y, y)	// "negative" y so we can replace sub with am later
    while (y.t < ys) y[y.t++] = 0
    while (--j >= 0) {
      // Estimate quotient digit
      var qd = (r[--i] == y0) ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2)
      if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) {	// Try it out
        y.dlShiftTo(j, t)
        r.subTo(t, r)
        while (r[i] < --qd) r.subTo(t, r)
      }
    }
    if (q != null) {
      r.drShiftTo(ys, q)
      if (ts != ms) BigInteger.ZERO.subTo(q, q)
    }
    r.t = ys
    r.clamp()
    if (nsh > 0) r.rShiftTo(nsh, r)	// Denormalize remainder
    if (ts < 0) BigInteger.ZERO.subTo(r, r)
  }

  // (public) this mod a
  function bnMod (a) {
    var r = nbi()
    this.abs().divRemTo(a, null, r)
    if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r, r)
    return r
  }

  // Modular reduction using "classic" algorithm
  function Classic (m) { this.m = m }
  function cConvert (x) {
    if (x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m)
    else return x
  }
  function cRevert (x) { return x }
  function cReduce (x) { x.divRemTo(this.m, null, x) }
  function cMulTo (x, y, r) { x.multiplyTo(y, r); this.reduce(r) }
  function cSqrTo (x, r) { x.squareTo(r); this.reduce(r) }

  Classic.prototype.convert = cConvert
  Classic.prototype.revert = cRevert
  Classic.prototype.reduce = cReduce
  Classic.prototype.mulTo = cMulTo
  Classic.prototype.sqrTo = cSqrTo

  function bnpInvDigit () {
    if (this.t < 1) return 0
    var x = this[0]
    if ((x & 1) == 0) return 0
    var y = x & 3		// y == 1/x mod 2^2
    y = (y * (2 - (x & 0xf) * y)) & 0xf	// y == 1/x mod 2^4
    y = (y * (2 - (x & 0xff) * y)) & 0xff	// y == 1/x mod 2^8
    y = (y * (2 - (((x & 0xffff) * y) & 0xffff))) & 0xffff	// y == 1/x mod 2^16
    // last step - calculate inverse mod DV directly;
    // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
    y = (y * (2 - x * y % this.DV)) % this.DV		// y == 1/x mod 2^dbits
    // we really want the negative inverse, and -DV < y < DV
    return (y > 0) ? this.DV - y : -y
  }

  // Montgomery reduction
  function Montgomery (m) {
    this.m = m
    this.mp = m.invDigit()
    this.mpl = this.mp & 0x7fff
    this.mph = this.mp >> 15
    this.um = (1 << (m.DB - 15)) - 1
    this.mt2 = 2 * m.t
  }

  // xR mod m
  function montConvert (x) {
    var r = nbi()
    x.abs().dlShiftTo(this.m.t, r)
    r.divRemTo(this.m, null, r)
    if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r, r)
    return r
  }

  // x/R mod m
  function montRevert (x) {
    var r = nbi()
    x.copyTo(r)
    this.reduce(r)
    return r
  }

  // x = x/R mod m (HAC 14.32)
  function montReduce (x) {
    while (x.t <= this.mt2)	// pad x so am has enough room later
    { x[x.t++] = 0 }
    for (var i = 0; i < this.m.t; ++i) {
      // faster way of calculating u0 = x[i]*mp mod DV
      var j = x[i] & 0x7fff
      var u0 = (j * this.mpl + (((j * this.mph + (x[i] >> 15) * this.mpl) & this.um) << 15)) & x.DM
      // use am to combine the multiply-shift-add into one call
      j = i + this.m.t
      x[j] += this.m.am(0, u0, x, i, 0, this.m.t)
      // propagate carry
      while (x[j] >= x.DV) { x[j] -= x.DV; x[++j]++ }
    }
    x.clamp()
    x.drShiftTo(this.m.t, x)
    if (x.compareTo(this.m) >= 0) x.subTo(this.m, x)
  }

  // r = "x^2/R mod m"; x != r
  function montSqrTo (x, r) { x.squareTo(r); this.reduce(r) }

  // r = "xy/R mod m"; x,y != r
  function montMulTo (x, y, r) { x.multiplyTo(y, r); this.reduce(r) }

  Montgomery.prototype.convert = montConvert
  Montgomery.prototype.revert = montRevert
  Montgomery.prototype.reduce = montReduce
  Montgomery.prototype.mulTo = montMulTo
  Montgomery.prototype.sqrTo = montSqrTo

  // (protected) true iff this is even
  function bnpIsEven () { return ((this.t > 0) ? (this[0] & 1) : this.s) == 0 }

  // (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
  function bnpExp (e, z) {
    if (e > 0xffffffff || e < 1) return BigInteger.ONE
    var r = nbi(); var r2 = nbi(); var g = z.convert(this); var i = nbits(e) - 1
    g.copyTo(r)
    while (--i >= 0) {
      z.sqrTo(r, r2)
      if ((e & (1 << i)) > 0) z.mulTo(r2, g, r)
      else { var t = r; r = r2; r2 = t }
    }
    return z.revert(r)
  }

  // (public) this^e % m, 0 <= e < 2^32
  function bnModPowInt (e, m) {
    var z
    if (e < 256 || m.isEven()) z = new Classic(m); else z = new Montgomery(m)
    return this.exp(e, z)
  }

  // protected
  BigInteger.prototype.copyTo = bnpCopyTo
  BigInteger.prototype.fromInt = bnpFromInt
  BigInteger.prototype.fromString = bnpFromString
  BigInteger.prototype.clamp = bnpClamp
  BigInteger.prototype.dlShiftTo = bnpDLShiftTo
  BigInteger.prototype.drShiftTo = bnpDRShiftTo
  BigInteger.prototype.lShiftTo = bnpLShiftTo
  BigInteger.prototype.rShiftTo = bnpRShiftTo
  BigInteger.prototype.subTo = bnpSubTo
  BigInteger.prototype.multiplyTo = bnpMultiplyTo
  BigInteger.prototype.squareTo = bnpSquareTo
  BigInteger.prototype.divRemTo = bnpDivRemTo
  BigInteger.prototype.invDigit = bnpInvDigit
  BigInteger.prototype.isEven = bnpIsEven
  BigInteger.prototype.exp = bnpExp

  // public
  BigInteger.prototype.toString = bnToString
  BigInteger.prototype.negate = bnNegate
  BigInteger.prototype.abs = bnAbs
  BigInteger.prototype.compareTo = bnCompareTo
  BigInteger.prototype.bitLength = bnBitLength
  BigInteger.prototype.mod = bnMod
  BigInteger.prototype.modPowInt = bnModPowInt

  // "constants"
  BigInteger.ZERO = nbv(0)
  BigInteger.ONE = nbv(1)

  return BigInteger
})()

console.log('BigInteger', BigInteger)
if (typeof module === 'object' && module.exports) {
  module.exports = BigInteger
}