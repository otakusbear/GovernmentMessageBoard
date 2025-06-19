from django.db import models

# Create your models here.
class Data(models.Model):
    city=models.CharField(max_length=255)
    object=models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    domain = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    # msgID = models.CharField(max_length=255)
    rplorg = models.CharField(max_length=255)
    senti = models.CharField(max_length=255)
    key = models.CharField(max_length=255)
    # keysent = models.CharField(max_length=255)
    rpl_atts = models.CharField(max_length=255)
    rpl_mods = models.CharField(max_length=255)
    msg_mods = models.CharField(max_length=255)
    # sentiment=models.IntegerField()
    msg_year = models.IntegerField()
    msg_month = models.IntegerField()
    reply_month = models.IntegerField()
    reply_year = models.IntegerField()
    text_len = models.IntegerField()
    rpl_len = models.IntegerField()
    reply_time_diff = models.IntegerField()
    # timedif = models.IntegerField()
    # keyscore=models.FloatField()
    # info = models.FloatField()
    msgtime=models.DateTimeField()
    rpltime=models.DateTimeField()
    # id=models.AutoField(primary_key=True)
    msgcontent=models.TextField()
    rplcontent = models.TextField()
    rpltimedif = models.IntegerField()
    sum=models.CharField(max_length=255)

    def toDict(self):
        return {"city":self.city,"object":self.object,"title":self.title,"type":self.type,"domain":self.domain,"state":self.state,"rplorg":self.rplorg,"senti":self.senti,"msg_mods":self.msg_mods,"rpl_atts":self.rpl_atts,"rpl_mods":self.rpl_mods,"msg_month":self.msg_month,"msg_year":self.msg_year,"reply_month":self.reply_month,"reply_year":self.reply_year,"text_len":self.text_len,"rpl_len":self.rpl_len,"msgtime":self.msgtime,"rpltime":self.rpltime,"rpltimedif":self.rpltimedif}

    class Meta:
        db_table="data"

class New(models.Model):
    city = models.CharField(max_length=255)
    object = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    domain = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    msgID = models.CharField(max_length=255)
    rplorg = models.CharField(max_length=255)
    senti = models.CharField(max_length=255)
    key = models.CharField(max_length=255)
    # keysent = models.CharField(max_length=255)
    rpl_atts = models.CharField(max_length=255)
    rpl_mods = models.CharField(max_length=255)
    msg_mods = models.CharField(max_length=255)
    # sentiment=models.IntegerField()
    msg_year = models.IntegerField()
    msg_month = models.IntegerField()
    reply_month = models.IntegerField()
    reply_year = models.IntegerField()
    text_len = models.IntegerField()
    rpl_len = models.IntegerField()
    reply_time_diff = models.IntegerField()
    # timedif = models.IntegerField()
    # keyscore=models.FloatField()
    # info = models.FloatField()
    msgtime = models.DateTimeField()
    rpltime = models.DateTimeField()
    # id=models.AutoField(primary_key=True)
    msgcontent = models.TextField()
    rplcontent = models.TextField()
    rpltimedif = models.IntegerField()
    sum = models.CharField(max_length=255)

    class Meta:
        db_table="new"

class Org(models.Model):
    org = models.CharField(max_length=255)
    weibo = models.CharField(max_length=255)
    web = models.CharField(max_length=255)
    mail = models.CharField(max_length=255)
    citybd = models.CharField(max_length=255)
    rmwbd = models.CharField(max_length=255)
    class Meta:
        db_table="org"

class Corpus(models.Model):
    城市 = models.CharField(max_length=255)
    留言对象 = models.CharField(max_length=255)
    留言标题 = models.CharField(max_length=255)
    留言类型 = models.CharField(max_length=255)
    留言领域 = models.CharField(max_length=255)
    留言状态 = models.CharField(max_length=255)
    留言ID = models.CharField(max_length=255,primary_key=True)
    回复组织 = models.CharField(max_length=255)
    留言年份 = models.IntegerField()
    留言月份 = models.IntegerField()
    回复年份 = models.IntegerField()
    回复月份 = models.IntegerField()
    留言时间 = models.DateTimeField()
    回复时间 = models.DateTimeField()
    留言内容 = models.TextField()
    回复内容 = models.TextField()


    class Meta:
        db_table="corpus"

class City(models.Model):
    城市 = models.CharField(max_length=255)
    留言对象 = models.CharField(max_length=255)
    留言标题 = models.CharField(max_length=255)
    留言类型 = models.CharField(max_length=255)
    留言领域 = models.CharField(max_length=255)
    留言状态 = models.CharField(max_length=255)
    留言ID = models.CharField(max_length=255,primary_key=True)
    回复组织 = models.CharField(max_length=255)
    留言年份 = models.IntegerField()
    留言月份 = models.IntegerField()
    回复年份 = models.IntegerField()
    回复月份 = models.IntegerField()
    留言时间 = models.DateTimeField()
    回复时间 = models.DateTimeField()
    留言内容 = models.TextField()
    回复内容 = models.TextField()


    class Meta:
        db_table="city"