import { formatDistanceStrict } from "date-fns"

export const convertToNumWithUnit = num => {
  const digitNum = String(num).length
  if (digitNum <= 3) {
    return num
  } else if (digitNum <= 6) {
    return String((Math.round(num / 100) * 100) / 1000) + 'k'
  }
  // else if (digitNum <= 6) {
  //   return (num / 1000).toPrecision(3) + 'k'
  // } else {
  //   return (num / 1000000).toPrecision(3) + 'm'
  // } 
}

export const convertToRelativeDate = timestamp => {
  let distance = formatDistanceStrict(Date.now(), timestamp)
  return distance + ' ago'
}

export const unescapeHtmlString = string => {
  const patterns = {
		'&lt;'   : '<',
		'&gt;'   : '>',
		'&amp;'  : '&',
		'&quot;' : '"',
		'&#x27;' : '\'',
		'&#x60;' : '`'
	};

  const regex = /&lt;|&gt;|&amp;|&quot;|&#x27;|&#x60;/g

  return string.replace(regex, match => {
    return patterns[match]
  })
}

export const correctLineBreaks = string => {
  return string.replace(/\n\n/g, '\n')
}