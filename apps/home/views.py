# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""
from datetime import datetime
from django.shortcuts import render
from django import template
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect,JsonResponse
from django.template import loader
from django.urls import reverse
from apps.home.models import Data
from django.core.paginator import Paginator,EmptyPage,PageNotAnInteger
from django.db.models import Q
import jionlp as jio
import pandas as pd
import json
from django.views.decorators.csrf import csrf_exempt
from apps.home.refrpl import simrpl
from apps.home.absSum import mt5Sum

di = Data.objects.all()
dlist=[]
for i in di:
    dlist.append(i.toDict())
df=pd.DataFrame(dlist)
# Create your views here.

class DateEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.strftime("%Y-%m-%d %H:%M:%S")
        else:
            return json.JSONEncoder.default(self, obj)

def one(request):

    return render(request, 'home/one.html')


def get_city_msg_num(request):

    city_msg_num_df=df[['city']].groupby('city',as_index=False)['city'].agg({'count':'count'})
    city_name =city_msg_num_df['city'].tolist()
    city_msg_num=city_msg_num_df['count'].tolist()

    return HttpResponse(json.dumps({'city_name':city_name,'city_msg_num':city_msg_num},ensure_ascii=False))
@csrf_exempt
def get_obj_msg_num(request):
    obj_msg_num_df=df[df.city=='武汉'].groupby('object',as_index=False)['object'].agg({'count':'count'})
    obj_name =obj_msg_num_df['object'].tolist()
    obj_msg_num=obj_msg_num_df['count'].tolist()

    return HttpResponse(json.dumps({'name':obj_name,'value':obj_msg_num},ensure_ascii=False))

def ts(request):
    # citys = list(set(df['city']))
    # data = df[['city', 'object', 'msgcontent']]
    # citys.reverse()
    # context={'city':citys,'data':data}

    query = request.GET.get('query')

    data = Data.objects.filter(city='武汉')
    print(data)
    if (query!=None) and (query!='None'):
        data = data.filter(msgcontent__icontains=query)
    pageIndex = request.GET.get("page",1)

    # 使用分页器分页
    pageInator = Paginator(data, 10)
    tab = pageInator.page(pageIndex)
    if tab.paginator.num_pages>=13:
        ifEllipsis=1
        range1=range(1,13)
        range2=range(1,15)
        range3=range(1,14)
        lastButOne=tab.paginator.num_pages-1
        return render(request, 'home/test.html',
                      {'Page': tab, 'query': query, 'range1': range1, 'range2': range2, 'range3': range3, 'lastButOne': lastButOne,'ifEllipsis':ifEllipsis})
    else:
        ifEllipsis=0
        return render(request,'home/test.html',{'Page':tab, 'query': query,'ifEllipsis':ifEllipsis})
def queryPage(request):
    query = request.GET.get('query')

    data = Data.objects.filter(city='武汉')
    data=data.filter(msgcontent__icontains=query)
    pageIndex = request.GET.get("page",1)

    # 使用分页器分页
    pageInator = Paginator(data, 10)
    tab = pageInator.page(pageIndex)
    if tab.paginator.num_pages>=13:
        ifEllipsis=1
        range1=range(1,13)
        range2=range(1,15)
        range3=range(1,14)
        lastButOne=tab.paginator.num_pages-1
        return render(request, 'home/test.html',
                      {'Page': tab, 'range1': range1, 'range2': range2, 'range3': range3, 'lastButOne': lastButOne,'ifEllipsis':ifEllipsis})
    else:
        ifEllipsis=0
        return render(request,'home/test.html',{'Page':tab,'ifEllipsis':ifEllipsis})
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
        sum = mt5Sum(msg1)

        context['sum']=sum
    else:
        context = {'sum': '输入内容不能为空！'}
    return JsonResponse(context)
def summain(request):
    p1=request.POST['p1']
    if p1:
        sum = jio.summary.extract_summary(p1, summary_length=50)

        context = {'sum': sum}
    else:
        context = {'sum': '输入内容不能为空！'}
    return render(request, 'home/index.html', context)
def get_obj(request):
    districts=[]
    citys=list(set(df['city']))
    for city in citys:
        district=list(set(df[df.city==city]['object']))
        districts.append(district)
    return HttpResponse(json.dumps({'city':citys,'district':districts},ensure_ascii=False))

def get_msg(request):
    msgss=[]
    districts=[]
    citys=list(set(df['city']))
    for city in citys:
        msgs=[]
        districts=list(set(df[df.city==city]['object']))
        for district in districts:
            msg=df[(df.city==city)&(df.object==district)&(len(df.msgcontent)>400)]['msgcontent'].tolist()
            msgs.append(msg)
        districts.append(district)
        msgss.append(msgs)
    return HttpResponse(json.dumps({'city':citys,'district':districts,'msgs':msgss},ensure_ascii=False))
def get_all(request):
    return JsonResponse(df[df.city=='武汉'].to_json(orient='records',force_ascii=False),safe=False)

@login_required(login_url="/login/")
def index(request):
    context = {'segment': 'index','msgdata': df[df.city=='武汉'].sort_values(by="msgtime",ascending=False), 'rpldata': df[(df.city=='武汉')&(df.state == '已办理')].sort_values(by="rpltime",ascending=False), 'torpl':df[(df.city=='武汉')&(df.state!='已办理')],
               'rate': round(len(df[(df.city=='武汉')&(df.state == '已办理')]) * 100 / len(df[df.city=='武汉']), 2)}
    html_template = loader.get_template('home/index.html')
    return HttpResponse(html_template.render(context, request))


@login_required(login_url="/login/")
def pages(request):
    context = {}
    # All resource paths end in .html.
    # Pick out the html file name from the url. And load that template.
    try:

        load_template = request.path.split('/')[-1]

        if load_template == 'admin':
            return HttpResponseRedirect(reverse('admin:index'))
        context = {'segment': load_template,'msgdata': df[df.city=='武汉'].sort_values(by="msgtime",ascending=False), 'rpldata': df[(df.city=='武汉')&(df.state == '已办理')].sort_values(by="rpltime",ascending=False), 'torpl':df[(df.city=='武汉')&(df.state!='已办理')],
               'rate': round(len(df[(df.city=='武汉')&(df.state == '已办理')]) * 100 / len(df[df.city=='武汉']), 2)}


        html_template = loader.get_template('home/' + load_template)
        return HttpResponse(html_template.render(context, request))

    except template.TemplateDoesNotExist:

        html_template = loader.get_template('home/page-404.html')
        return HttpResponse(html_template.render(context, request))

    except:
        html_template = loader.get_template('home/page-500.html')
        return HttpResponse(html_template.render(context, request))

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
    sum = mt5Sum(text)
    return HttpResponse(sum)
