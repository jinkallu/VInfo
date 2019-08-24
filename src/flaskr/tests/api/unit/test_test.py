# This Python file uses the following encoding: utf-8

import pytest
from flask import json

from flaskr.api.run import app

def test_login(record_property):
    """
    GIVEN a username and password
    WHEN the User login
    THEN check the username, password, authenticate, and give success and create session
    """
    response = app.test_client().post(
            '/login',
            data=json.dumps({'username': 'jinesh', 'password' : 'jinesh', 'sessiondata': 'dummy'}),
            content_type='application/json',
        )
    data = json.loads(response.get_data(as_text=True))

    assert response.status_code == 200
    assert len(data['session']) > 0;
    assert len(data['access_token']) > 0;
    assert len(data['refresh_token']) > 0;
    assert data['message'] == 'Session Created Successfully';

@pytest.mark.xfail # make the test fail
def test_listnodes():
    """
    Given session,
    When access listnodes
    Then return list of nodes
    """
    response = app.test_client().post(
            '/listnodes',
            data=json.dumps({'session': '255f6251-aac3-4fac-91ce-307fa88258f3'}),
            content_type='application/json',
        )
    data = json.loads(response.get_data(as_text=True))

    assert response.status_code == 200
    #assert data[0][0][0]['level'] == 0

    #assert data[0][1]['status'] == 'success '
    #assert data[0][1]['message'] == 'Process completed successfully...'

