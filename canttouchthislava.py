import webapp2

class MainPage(webapp2.RequestHandler):
  def get(self):
      self.response.headers['Content-Type'] = 'text/plain'
      self.response.out.write('Hello, Lava!')

app = webapp2.WSGIApplication([('/', MainPage)],
                              debug=True)
#~/google_appengine/appcfg.py --oauth2 update LavaHacks/
