# email = medius.web@gmail.com
# password = medius3306_4

import smtplib
from fastapi.param_functions import Body
import requests 

from fastapi.exceptions import HTTPException
from sqlalchemy.sql.expression import text
import json 

def smtp_send_reset_password_email(receive_email: str, url: str):
    gmail_user = 'medius.web@gmail.com'
    gmail_password = 'medius3306_4'

    sent_from = gmail_user
    to = receive_email
    subject = 'reset your password (from medius)'
    body = url

    email_text = """\
    From: %s
    To: %s
    Subject: %s

    Please click the link below to reset your password on medius
    %s
    """ % (sent_from, to, subject, body)

    print(email_text)

    try:
        smtp_server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        smtp_server.ehlo()
        smtp_server.login(gmail_user, gmail_password)
        smtp_server.sendmail(sent_from, to, email_text)
        smtp_server.close()
        print ("Email sent successfully!")
    except Exception as ex:
        raise HTTPException(status_code=500, detail="Something went wrong with email sender")


def postmark_send_reset_password_email(receive_email: str, url: str):
    postmark_url = 'https://api.postmarkapp.com/email'
    postmark_header = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-Postmark-Server-Token": "a0501226-57c1-4a03-a6c2-047fe2b66547"
    }
    postmark_data = {
        "From": "19020025@vnu.edu.vn",
        "To": "19020025@vnu.edu.vn",
        # "Subject": "Hello from Postmark",
        # "HtmlBody": "<strong>Hello</strong> dear Postmark user.",
        "MessageStream": "password_reset"
    }

    response = requests.post(
        url=postmark_url,
        # headers=json.dumps(postmark_header, indent=4),
        headers={
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-Postmark-Server-Token": "a0501226-57c1-4a03-a6c2-047fe2b66547"
        },
        data=json.dumps(postmark_data, indent=4)
    )

    print(response.status_code)

    if response.status_code == 200:
        print("HELLO")
    else: 
        print("?????")