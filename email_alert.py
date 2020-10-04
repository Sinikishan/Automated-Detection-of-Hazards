import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders

def send_alert():
   senderAddress = 'dust.storm.alert@gmail.com'
   senderPassword = '@Antriksh123'
   server = 'smtp.gmail.com:587'
   recieverAddress = ['','']

   text = """
      ALERT!!

      Dust storm coming your way!
      Please seek shelter immediatly. 

      """
   html = """
      <html>

      <head>
      </head>

      <body>
         <p>ALERT!!</p>
         <p>Dust storm headed your way! <br/>
         Please seek shelter immediatly. </p><br/>
      </body>

      </html>
      """

   message = MIMEMultipart("alternative", None, [MIMEText(text), MIMEText(html,'html')])

   message['Subject'] = "Dust Storm Alert"
   message['From'] = senderAddress
   message['To'] = ", ".join(recieverAddress)
   server = smtplib.SMTP(server)
   server.ehlo()
   server.starttls()
   server.login(senderAddress, senderPassword)
   server.sendmail(senderAddress, recieverAddress, message.as_string())
   # print('Email Sent')
   server.quit()
