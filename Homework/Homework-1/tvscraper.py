#!/usr/bin/env python

# Name: Mounir Hader
# Student number: 10254925

'''
This script scrapes IMDB and outputs a CSV file with highest ranking tv series.
'''
import csv

from pattern.web import URL, DOM

TARGET_URL = "http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series"
BACKUP_HTML = 'tvseries.html'
OUTPUT_CSV = 'tvseries.csv'

def extract_tvseries(dom):
    '''
    Extract a list of highest ranking TV series from DOM (of IMDB page).

    Each TV series entry should contain the following fields:
    - TV Title
    - Ranking
    - Genres (comma separated if more than one)
    - Actors/actresses (comma separated if more than one)
    - Runtime (only a number!)
    '''

    # create/empty list to store tv series information from IMDB
    top50 = []

    # define outer DOM as all TV series in the list to loop over
    for a in dom.by_tag("tr.detailed")[:50]:

        # create empty lists/strings to store desired information per TV series
        serieslist = []
        genreList = ""
        actorList = ""

        # locate series name and append to serieslist
        for b in a.by_tag("td.title"):
            for title in b.by_tag("a")[:1]:
                serieslist.append(str(title[0]))
            # locate series rating and append to serieslist
            for c in b.by_tag("div.user_rating"):
                for d in c.by_tag("div.rating rating-list"):
                    for e in d.by_tag("span.rating-rating"):
                        for ranking in e.by_tag("span.value"):
                            serieslist.append(str(ranking[0]))

        # locate genres and add them to string genrelist, comma separated
        for genres in b.by_tag("span.genre"):
            for genre in genres.by_tag("a"):
                genreList += str(genre[0])
                genreList += ", "
        # remove last comma in string genrelist and append to serieslist
        genreList = genreList[:-2]
        serieslist.append(genreList)

        # locate actors and add them to string actorlist, comma separated
        for actors in b.by_tag("span.credit"):
            for actor in actors.by_tag("a"):
                actorList += str(actor[0])
                actorList += ", "
        # remove last comma in string actorlist and append to serieslist
        actorList = actorList[:-2]
        serieslist.append(actorList)

        # locate runtime and remove the characters that make up " mins."
        for runtime in b.by_tag("span.runtime"):
            runtime = str(runtime[0])
            runtime = runtime[:-6]
            # append to serieslist
            serieslist.append(str(runtime))

        # append serieslist to top 50 list
        top50.append(serieslist)

    return top50

def save_csv(f, tvseries):
    '''
    Output a CSV file containing highest ranking TV-series.
    '''
    # headers
    writer = csv.writer(f)
    writer.writerow(['Title', 'Ranking', 'Genre', 'Actors', 'Runtime'])

    # write CSV file with 1 TV series's information per row
    for row in tvseries:
        writer.writerow(row)

if __name__ == '__main__':
    # Download the HTML file
    url = URL(TARGET_URL)
    html = url.download()

    # Save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in testing / grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # Parse the HTML file into a DOM representation
    dom = DOM(html)

    # Extract the tv series (using the function you implemented)
    tvseries = extract_tvseries(dom)

    # Write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'wb') as output_file:
        save_csv(output_file, tvseries)
