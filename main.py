#!/usr/bin/python

"""RequestHandlers"""

__author__ = 'scarygami@gmail.com (Gerwin Sturm)'

import webapp2

class IndexHandler(webapp2.RequestHandler):
  def get(self):
    self.response.out.write("Nothing to see here...")

ROUTES = [
  ("/", IndexHandler)
]

app = webapp2.WSGIApplication(ROUTES, debug=True)
