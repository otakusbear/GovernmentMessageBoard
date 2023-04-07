from django.db import models

# Create your models here.
class Data(models.Model):
    city=models.CharField(max_length=255)
    object=models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    domain = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    msgID = models.CharField(max_length=255)
    rplorg = models.CharField(max_length=255)
    senti = models.CharField(max_length=255)
    key = models.CharField(max_length=255)
    keysent = models.CharField(max_length=255)
    rpl_atts = models.CharField(max_length=255)
    rpl_mods = models.CharField(max_length=255)
    msg_mods = models.CharField(max_length=255)
    sentiment=models.IntegerField()
    msg_year = models.IntegerField()
    msg_month = models.IntegerField()
    reply_month = models.IntegerField()
    reply_year = models.IntegerField()
    text_len = models.IntegerField()
    rpl_len = models.IntegerField()
    reply_time_diff = models.IntegerField()
    timedif = models.IntegerField()
    keyscore=models.FloatField()
    info = models.FloatField()
    msgtime=models.DateTimeField()
    rpltime=models.DateTimeField()
    id=models.AutoField(primary_key=True)
    msgcontent=models.TextField()
    rplcontent = models.TextField()
    rpltimedif = models.IntegerField()

    def toDict(self):
        return {"city":self.city,"object":self.object,"title":self.title,"type":self.type,"domain":self.domain,"state":self.state,"msgID":self.msgID,"rplorg":self.rplorg,"senti":self.senti,"key":self.key,"keysent":self.keysent,"keyscore":self.keyscore,"msg_mods":self.msg_mods,"rpl_atts":self.rpl_atts,"rpl_mods":self.rpl_mods,"sentiment":self.sentiment,"msg_month":self.msg_month,"msg_year":self.msg_year,"reply_month":self.reply_month,"reply_year":self.reply_year,"text_len":self.text_len,"rpl_len":self.rpl_len,"reply_time_diff":self.reply_time_diff,"timedif":self.timedif,"info":self.info,"msgtime":self.msgtime,"rpltime":self.rpltime,"id":self.id,"msgcontent":self.msgcontent,"rplcontent":self.rplcontent,"rpltimedif":self.rpltimedif}

    class Meta:
        db_table="data"
