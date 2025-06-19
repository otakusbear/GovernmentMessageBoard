# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django.urls import path, re_path
from apps.home import views

urlpatterns = [

    # The home page
    path('data/', views.index, name='home'),
    path('',views.one),

    path('abssum/',views.abssum),
    path('queryPage/',views.queryPage,name='queryPage'),
    path('search/',views.search,name='search'),
    path('get_all/',views.get_all,name="get_all"),
    path('get_new/',views.get_new,name="get_new"),
    path('test/',views.textpost,name="test"),
    path('get_sum/',views.get_sum,name="get_sum"),
    path('get_abs/',views.get_abs,name="get_abs"),
    path('get_rpl/',views.get_rpl,name="get_rpl"),
    path('scrach/', views.scrach, name='scrach'),
    path('corpus/',views.ts,name="ts"),
    path('get_obj_msg_num/',views.get_obj_msg_num,name="get_obj_msg_num"),

    # Matches any html file
    re_path(r'^.*\.*', views.pages, name='pages'),

]
