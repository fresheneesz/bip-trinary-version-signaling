


function getSignalForSlot(nVersion, slotNumber) {
  var bucket = Math.floor(slotNumber/5)
  var relevantBits = nVersion >>
}

// slotValues - An array of size 15 where each element represents a
//              signaling slot with potential values -1 0 or 1.
// Returns a 3-byte number that represents the pased in slot values.
function createVersionByte(slotValues) {
  var highOrderBits = ternaryDigitsToNumber(slotValues.slice(0,5))
  var midOrderBits = ternaryDigitsToNumber(slotValues.slice(5,10))
  var lowOrderBits = ternaryDigitsToNumber(slotValues.slice(10,15))

  return highOrderBits*256*256 + midOrderBits*256 + lowOrderBits
}

function createEmptySlotList() {
  var slots = []
  for(var n=0; n<8*3; n++) {
    slots[n] = 0
  }
  return slots
}


// Converts a list of positive ternary digits to a number.
// ternaryDigits - An array of ternary digits (0, 1, or 2) , where digits at lower indexes are higher order digits.
function ternaryDigitsToNumber(ternaryDigits) {
  var result = 0
  ternaryDigits.forEach((v) => {
    result = result*3 + v
  })
  return result
}


// Converts a positive integer to a ternary digit list.
// Returns an array of ternary digits (0, 1, or 2) , where digits at lower indexes are higher order digits.
function convertToTernaryDigits(n) {
  if (n == 0)
      return [0]

  let x = n % 3
  n = Math.floor(n/3)

  var digits = convertToTernary(n) // At this point, digits will contain the higher order digits
  digits.push(x)

  return digits
}

function getSlotValue(nVersion, slotIndex) {
  var bucket = Math.floor(slotNumber/5)
  var bucketIndex = slotNumber % 5
  var relevantBits = (nVersion >> 8*bucket) | 0xFF

  var remainingBits = relevantBits
  for(var n=0; n<bucketIndex; n++) {
    remainingBits = Math.floor(remainingBits/3)
  }

  return remainingBits % 3
}

function thresholdReached(supportCount, opposeCount, min_threshold, max_threshold) {
  var maxPassingOpposition = 2016 - max_threshold
  var fractionOfMaxPassingOpposition = opposeCount/maxPassingOpposition
  var requiredThreshold = min_threshold + (max_threshold-min_threshold)/fractionOfMaxPassingOpposition
  return supportCount >= requiredThreshold
}