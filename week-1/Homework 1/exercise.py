# Name : Mounir Hader
# Student number : 10254935
'''
This module contains an implementation of split_string.
'''

def split_string(source, separators):
    '''
    Split a string <source> on any of the characters in <separators>.

    The ouput of this function should be a list of strings split at the
    positions of each of the separator characters.
    '''

    # store lengths of input strings
    separatorslength = len(separators)
    sourcelength = len(source)

    # create empty list lijssie to store output strings
    lijssie = []

    # define and set variable start to zero
    start = 0

    # loop over characters in source string
    for i in range(sourcelength):
        # compare every source string character with every separator string character
        for j in range(separatorslength):
            # if the characters are the same define the word to be stored in
            # lijssie (from value of start to outer loop index)
            if separators[j] == source[i]:
                word = source[start:i]
                # if the length of word is greater than zero, append the word to lijssie
                if len(word) > 0:
                    lijssie.append(word)
                    # empty string word
                    word = ""
                # update variable start
                start = i+1

    # update word to represent all the remaining characters
    # after the last separator character in source
    word = source[start:len(source)]
    # if there are still characters in word append them as the final string to lijssie
    if word != "":
        lijssie.append(word)

    return lijssie

if __name__ == '__main__':
    # You can try to run your implementation here, that will not affect the
    # automated tests.
    print split_string('jahhhoooooorrrrr', 'hoz')  # should print: ['ja', 'rrrrr']
