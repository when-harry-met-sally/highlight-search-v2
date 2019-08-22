# elastic-search-v2: NASA math in its purest form

When given a list of objects of the same type, a search string, and a list of fields you wish to search on the objects within the list, this function will return a filtered list where matches with the search string will be wrapped in a SPAN with a class of 'hl'. 

Recent change:
Rather than taking a list of strings as the fields that should be searched, the function now takes a list of a list of strings. Previously, fields could only be checked if they were one layer deep. 

Before change:
A list of employees, all having a name field and address field, can be searched with ['name', 'address'] as the string[] argument.

After change:
A list of employees, all having a name field and an address object with the nested fields 'street', 'state', and 'country'.

This function can now search nested objects like these. If we wanted to search the employee's name and street, the string[][] would look like this: [['name'], ['address', 'street']].

The string[][] serves as directions to navigate to the desired string field.

Upcoming changes:
Searches can handle string fields now, but will be able to handle a list of strings.

When another list of uniform objects is found, the function calls itself.
