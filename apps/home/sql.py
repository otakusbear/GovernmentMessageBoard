import pymysql
db = pymysql.connect(host='47.109.33.146', port=3306, user='root', passwd='Hu_nlp1234', db ='yuwei', charset ='utf8')
cursor = db.cursor()

import datetime
import pandas as pd

data=pd.read_excel('新数据.xlsx')
new_columns = ['城市', '留言对象','留言类型','留言领域','留言状态','留言ID','留言时间','回复组织','回复时间','sentiment','senti','msg_year','msg_month','reply_year','reply_month','text_len','时间差','reply_time_diff','关键词','rpl_mods','rpl_atts','msg_mods','留言内容','回复内容','sum']
new_columns = [col for col in new_columns if col not in data.columns]
data = data.reindex(columns=data.columns.tolist() + new_columns)
def diftime(a, b):

    if b is None:
        return -1
    if b - a <= 7:
        return 1
    elif 7 < b - a <= 15:
        return 0
    else:
        return -1


def sqlInsertforDF(data):
    for index,row in data.iterrows():
        sql = "INSERT INTO `new` (`city`,`object`,`title`,`type`,`domain`,`state`,`msgID`,`msgtime`,`rplorg`,`rpltime`,`sentiment`,`senti`,`msg_year`,`msg_month`,`reply_year`,`reply_month`,`text_len`,`timedif`,`reply_time_diff`,`key`,`rpl_mods`,`rpl_atts`,`msg_mods`,`msgcontent`,`rplcontent`,`sum`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);"
        cursor.execute(sql,(row['城市'] if pd.notnull(row['城市']) else None,row['留言对象'] if pd.notnull(row['留言对象']) else None,row['留言标题'] if pd.notnull(row['留言标题']) else None,row['留言类型'] if pd.notnull(row['留言类型']) else None,row['留言领域'] if pd.notnull(row['留言领域']) else None,row['留言状态'] if pd.notnull(row['留言状态']) else None,row['留言ID'] if pd.notnull(row['留言ID']) else None,row['留言时间'] if pd.notnull(row['留言时间']) else None,row['回复组织'] if pd.notnull(row['回复组织']) else None,row['回复时间'] if pd.notnull(row['回复时间']) else None,row['sentiment'] if pd.notnull(row['sentiment']) else None,row['senti'] if pd.notnull(row['senti']) else None,row['msg_year'] if pd.notnull(row['msg_year']) else datetime.datetime.fromtimestamp(row['留言时间']).year,row['msg_month'] if pd.notnull(row['msg_month']) else datetime.datetime.fromtimestamp(row['留言时间']).month,row['reply_year'] if pd.notnull(row['reply_year']) else datetime.datetime.fromtimestamp(row['回复时间']).year,row['reply_month'] if pd.notnull(row['reply_month']) else datetime.datetime.fromtimestamp(row['回复时间']).month,row['text_len'] if pd.notnull(row['text_len']) else None,row['时间差'] if pd.notnull(row['时间差']) else None,row['reply_time_diff'] if pd.notnull(row['reply_time_diff']) else diftime(row['留言时间'],row['回复时间']),row['关键词'] if pd.notnull(row['关键词']) else None,row['rpl_mods'] if pd.notnull(row['rpl_mods']) else None,row['rpl_atts'] if pd.notnull(row['rpl_atts']) else None,row['msg_mods'] if pd.notnull(row['msg_mods']) else None,row['留言内容'] if pd.notnull(row['留言内容']) else None,row['回复内容'] if pd.notnull(row['回复内容']) else None,row['sum'] if pd.notnull(row['sum']) else None))
        print('正在注入第'+str(index)+'条,共'+str(len(data))+'条')
    db.commit()
    db.close()



from functools import reduce
def pipelineforDF(data, fns):
    return reduce(lambda a, x: x(a),
                  fns,
                  data)


pipelineforDF(data,[sqlInsertforDF])