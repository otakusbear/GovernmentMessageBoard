# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""
from django.views.decorators.cache import cache_control
import urllib.request
from django.shortcuts import render
from django import template
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect,JsonResponse
from django.template import loader
from django.urls import reverse
from apps.home.models import Data,Org,Corpus,City
from django.core.paginator import Paginator,EmptyPage,PageNotAnInteger
from django.db.models import Q
from datetime import timedelta,datetime
import jionlp as jio
from .answer import get_reply
import pandas as pd
import json
import re
from django.utils.html import format_html
from django.views.decorators.csrf import csrf_exempt
from bs4 import BeautifulSoup
from django.utils import timezone
# from apps.home.absSum import mt5Sum
org = Org.objects
di = Data.objects.all().order_by('-msgtime')
corpus = Corpus.objects.filter().order_by('-留言时间')
citycorpus= City.objects.filter().order_by('-留言时间')

org=pd.DataFrame.from_records(org.values())
df=pd.DataFrame.from_records(di.values())
# msgnum=len(citycorpus)+len(corpus)
# rplnum=len(citycorpus.filter(留言状态__icontains='已办理'))+len(corpus.filter(留言状态__icontains='已办理'))
# ingnum=len(citycorpus.filter(留言状态__icontains='办理中'))+len(corpus.filter(留言状态__icontains='办理中'))
# df = df.sort_values(by='msgtime', ascending=False)
# Create your views here.


def one(request):

    return render(request, 'home/one.html')


# def get_city_msg_num(request):
#
#     city_msg_num_df=df[['city']].groupby('city',as_index=False)['city'].agg({'count':'count'})
#     city_name =city_msg_num_df['city'].tolist()
#     city_msg_num=city_msg_num_df['count'].tolist()
#
#     return HttpResponse(json.dumps({'city_name':city_name,'city_msg_num':city_msg_num},ensure_ascii=False))
@csrf_exempt
def get_obj_msg_num(request):
    city=request.GET.get('city')
    obj_msg_num_df=df[df['city']==city].groupby('object',as_index=False)['object'].agg({'count':'count'})
    obj_name =obj_msg_num_df['object'].tolist()
    obj_msg_num=obj_msg_num_df['count'].tolist()

    return HttpResponse(json.dumps({'name':obj_name,'value':obj_msg_num},ensure_ascii=False))
def search(request):
    # citys = list(set(df['city']))
    # data = df[['city', 'object', 'msgcontent']]
    # citys.reverse()
    # context={'city':citys,'data':data}
    city=request.GET.get('city')
    query = request.GET.get('query')

    data =di
    if (city!=None) and (city!='None'):
        data = data.filter(city__exact=city)
    if (query!=None) and (query!='None'):
        data = data.filter(msgcontent__icontains=query)
    pageIndex = request.GET.get("page",1)

    # 使用分页器分页
    pageInator = Paginator(data, 10)
    tab = pageInator.page(pageIndex)

    if (query!=None) and (query!='None'):
        for record in tab:
            try:
                record.title=format_html(
                re.sub(
                    query,
                    lambda match: '<span style="color: red">{}</span>'.format(match.group()),
                    record.title,
                    flags=re.IGNORECASE
                )
                )
                record.mark = re.sub(query, lambda match: '<span style="color: red">{}</span>'.format(match.group()), record.msgcontent, flags=re.IGNORECASE)
            except Exception as e:
                print(e)
    else:
        for record in tab:
            record.mark=record.msgcontent
    if tab.paginator.num_pages>=9:
        ifEllipsis=1
        range1=range(1,9)
        range2=range(1,11)
        range3=range(1,10)
        lastButOne=tab.paginator.num_pages-1
        return render(request, 'home/search.html',
                      {'Page': tab, 'query': query,'city': city, 'range1': range1, 'range2': range2, 'range3': range3, 'lastButOne': lastButOne,'ifEllipsis':ifEllipsis})
    else:
        ifEllipsis=0
        return render(request,'home/search.html',{'Page':tab, 'query': query,'city': city,'ifEllipsis':ifEllipsis})

def ts(request):
    cities=["北京", "成都", "重庆", "长春", "长沙", "福州", "广州", "贵阳", "哈尔滨", "海口", "合肥", "呼和浩特", "济南", "昆明", "兰州", "拉萨", "澳门", "南昌", "南京", "南宁", "上海", "沈阳", "石家庄", "太原", "台湾", "天津", "香港", "武汉", "乌鲁木齐", "西安", "西宁", "银川", "郑州", "杭州"]
    cityarea = request.GET.get('city')
    area = request.GET.get('area')
    state = request.GET.get('state')
    query = request.GET.get('query')
    source=request.GET.get('source')
    type = request.GET.get('type')
    if request.method == 'POST':
        start_date_str = request.POST.get('start_date')
        end_date_str = request.POST.get('end_date')
        # Store the filter parameters in session data
        request.session['start_date'] = start_date_str
        request.session['end_date'] = end_date_str
    else:
        # Retrieve the filter parameters from session data
        start_date_str = request.session.get('start_date')
        end_date_str = request.session.get('end_date')
    if(source=='cjw'):
        data =citycorpus
    else:
        data=corpus
    if cityarea and (cityarea!='None'):
        data = data.filter(城市__exact=cityarea)
    if area and (area!='None'):
        data = data.filter(留言对象__exact=area)
    if (query!=None) and (query!='None'):
        data = data.filter(留言内容__icontains=query)
    if state and (state!='None'):
        data = data.filter(留言状态__exact=state)
    if type and (type!='None'):
        data = data.filter(留言类型__exact=type)

    start_date = timezone.make_aware(datetime.strptime(start_date_str, '%Y-%m-%d')) if start_date_str else timezone.make_aware(datetime(2022,1,1))
    end_date = timezone.make_aware(datetime.strptime(end_date_str, '%Y-%m-%d')) if end_date_str else timezone.now().date()

    data = data.filter(留言时间__range=(start_date,end_date))


    pageIndex = request.GET.get("page",1)

    # 使用分页器分页
    pageInator = Paginator(data, 10)
    tab = pageInator.page(pageIndex)

    if (query!=None) and (query!='None'):
        for record in tab:
            try:
                record.留言标题=re.sub(
                    query,
                    lambda match: '<span style="color: red">{}</span>'.format(match.group()),
                    record.留言标题,
                    flags=re.IGNORECASE
                )

                record.mark = re.sub(query, lambda match: '<span style="color: red">{}</span>'.format(match.group()), record.留言内容, flags=re.IGNORECASE)
            except Exception as e:
                print(e)
    if tab.paginator.num_pages>=9:
        ifEllipsis=1
        range1=range(1,9)
        range2=range(1,11)
        range3=range(1,10)
        lastButOne=tab.paginator.num_pages-1
        return render(request, 'home/test.html',
                      {'cities':cities,'Page': tab, 'query': query, 'type':type,'source':source,'city': cityarea,'area': area,'state': state,'range1': range1, 'range2': range2, 'range3': range3, 'lastButOne': lastButOne,'ifEllipsis':ifEllipsis})
    else:
        ifEllipsis=0
        return render(request,'home/test.html',{'cities':cities,'Page':tab, 'query': query,'type':type, 'source':source,'city': cityarea,'area': area,'state': state,'ifEllipsis':ifEllipsis})
def queryPage(request):
    query = request.GET.get('query')

    data=di
    if (query != None) and (query != 'None'):
        data = di.filter(msgcontent__icontains=query)
    pageIndex = request.GET.get("page",1)

    # 使用分页器分页
    pageInator = Paginator(data, 10)
    tab = pageInator.page(pageIndex)
    if tab.paginator.num_pages>=9:
        ifEllipsis=1
        range1=range(1,9)
        range2=range(1,11)
        range3=range(1,10)
        lastButOne=tab.paginator.num_pages-1
        return {'Page': tab, 'range1': range1, 'range2': range2, 'range3': range3, 'lastButOne': lastButOne,'ifEllipsis':ifEllipsis}
    else:
        ifEllipsis=0
        return {'Page':tab,'ifEllipsis':ifEllipsis}
def textpost(request):

    msg1=request.POST.get('text')

    context={}
    if msg1!="":
        sum = jio.summary.extract_summary(msg1, summary_length=50)

        context['sum']=sum
    else:
        context = {'sum': '输入内容不能为空！'}

    return JsonResponse(context)

def abssum(request):

    msg1=request.POST.get('text')

    context={}
    if msg1!="":
        sum = msg1

        context['sum']=sum
    else:
        context = {'sum': '输入内容不能为空！'}
    return JsonResponse(context)

# def get_obj(request):
#     districts=[]
#     citys=list(set(df['city']))
#     for city in citys:
#         district=list(set(df[df.city==city]['object']))
#         districts.append(district)
#     return HttpResponse(json.dumps({'city':citys,'district':districts},ensure_ascii=False))

# def get_msg(request):
#     msgss=[]
#     districts=[]
#     citys=list(set(df['city']))
#     for city in citys:
#         msgs=[]
#         districts=list(set(df[df.city==city]['object']))
#         for district in districts:
#             msg=df[(df.city==city)&(df.object==district)&(len(df.msgcontent)>400)]['msgcontent'].tolist()
#             msgs.append(msg)
#         districts.append(district)
#         msgss.append(msgs)
#     return HttpResponse(json.dumps({'city':citys,'district':districts,'msgs':msgss},ensure_ascii=False))
@cache_control(max_age=3600)
def get_all(request):
    chart=df.drop(['sum', 'msgcontent','rplcontent','title'], axis=1)
    return JsonResponse(chart.to_json(orient='records',force_ascii=False),safe=False)

@cache_control(max_age=3600)
def get_new(request):
    city=request.GET.get('city')
    table=df[df['city']==city].head(200)
    return JsonResponse(table.to_json(orient='records',force_ascii=False),safe=False)
#@login_required(login_url="/login/")
def index(request):
    context = {'segment': 'index','msgdata': df.sort_values(by="msgtime",ascending=False).reset_index(drop=True),'data':df,'range':range(10), 'rpldata': df[df.state == '已办理'].sort_values(by="rpltime",ascending=False).reset_index(drop=True), 'torpl':df[df.state!='已办理'],
               'rate': round(len(df[df.state == '已办理']) * 100 / len(df), 2)}
    html_template = loader.get_template('home/index.html')
    return HttpResponse(html_template.render(context, request))


#@login_required(login_url="/login/")
def pages(request):
    context = {}
    # url = 'http://www.caidian.gov.cn/hdjl/lygk/'
    # response = urllib.request.urlopen(url)
    #
    # # total={'msgnum':msgnum,'rplnum':rplnum,'ingnum':ingnum,'nonum':msgnum-rplnum-ingnum,'rate':round(rplnum*100/msgnum,2)}
    # # print(total)
    # # 读取响应内容
    # data = response.read()
    # soup = BeautifulSoup(data, 'html.parser')
    # element = soup.find('ul', {'id': 'share'})
    # # element=element.string.replace_with(element.text.replace('","', '').replace('"["', '').replace('"]"', ''))
    # element=str(element).replace('","', '').replace('"["', '').replace('"]"', '').replace('".','"http://www.caidian.gov.cn/hdjl/lygk')
    # All resource paths end in .html.
    # Pick out the html file name from the url. And load that template.
    try:

        load_template = request.path.split('/')[-1]

        if load_template == 'admin':
            return HttpResponseRedirect(reverse('admin:index'))
        context = {'org':org.to_json(orient='records',force_ascii=False),'segment': load_template,'msgdata': df.sort_values(by="msgtime",ascending=False),'range':range(30), 'rpldata': df[df.state == '已办理'].sort_values(by="rpltime",ascending=False), 'torpl':df[df.state!='已办理'],
               'rate': round(len(df[df.state == '已办理']) * 100 / len(df), 2)}

        html_template = loader.get_template('home/' + load_template)
        return HttpResponse(html_template.render(context, request))

    except template.TemplateDoesNotExist:

        html_template = loader.get_template('home/page-404.html')
        return HttpResponse(html_template.render(context, request))

    # except:
    #     html_template = loader.get_template('home/page-500.html')
    #     return HttpResponse(html_template.render(context, request))

# def get_page(request):
#     data=Data.objects.filter(city='武汉')
#     dataCount=data.count()
#     pageIndex=request.GET.get("pageIndex")
#     pageSize=request.GET.get("pageSize")
#
#
#     # 将数据组装成字典后放入data_list列表
#     data_list, ref_data = [], []
#     for item in data:
#         dict = {'id': item.id, 'hostname': item.object, 'hostaddr': item.type, 'hostmode': item.domain, 'state':item.state,'time':item.msgtime}
#         data_list.append(dict)
#
#     # 使用分页器分页
#     pageInator = Paginator(data_list, pageSize)
#     context = pageInator.page(pageIndex)
#     for item in context:
#         ref_data.append(item)
#     # 返回分页格式
#     data = {"code": 0, "msg": "ok", "DataCount": dataCount, "data": ref_data}
#     print(pageInator)
#     return render(request,'home/test.html',{'ref_data':pageInator})

def get_sum(request):
    text=request.GET.get('text')
    sum = jio.summary.extract_summary(text, summary_length=50)
    return HttpResponse(sum)

def get_abs(request):
    text=request.GET.get('text')
    sum = text
    return HttpResponse(sum)

def get_rpl(request):
    text=request.GET.get('msg')
    sum = get_reply(text)
    return HttpResponse(sum)
def scrach(request):
    url='http://www.caidian.gov.cn/hdjl/lygk/'
    response = urllib.request.urlopen(url)

    # 读取响应内容
    data = response.read()
    soup = BeautifulSoup(data, 'html.parser')
    element = soup.find('ul', {'id': 'share'})
    # 在这里处理抓取到的内容...

    # 渲染模板并返回结果
    return render(request, 'home/scrach.html', {'content': element})