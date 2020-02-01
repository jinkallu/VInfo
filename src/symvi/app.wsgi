activate_this = '/app/src/venv/bin/activate_this.py'
execfile(activate_this, dict(__file__=activate_this))

import logging
import sys
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0, '/app/src/symvi/')
from app import app as application
application.secret_key = 'anything you wish'
