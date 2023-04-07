# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django.urls import path, re_path
from apps.home import views

urlpatterns = [

    # The home page
    path('', views.index, name='home'),
    path('one/',views.one),
    path('get_obj/',views.get_obj,name="get_obj"),
    path('abssum/',views.abssum),
    path('queryPage/',views.queryPage,name='queryPage'),
    path('get_msg/',views.get_msg,name="get_msg"),
    path('get_all/',views.get_all,name="get_all"),
    path('test/',views.textpost,name="test"),
    path('get_sum/',views.get_sum,name="get_sum"),
    path('get_abs/',views.get_abs,name="get_abs"),
    path('summain/',views.summain,name="summain"),
    path('ts/',views.ts,name="ts"),
    path('get_obj_msg_num/',views.get_obj_msg_num,name="get_obj_msg_num"),
    path('get_city_msg_num/',views.get_city_msg_num,name="get_city_msg_num"),
    # Matches any html file
    re_path(r'^.*\.*', views.pages, name='pages'),

]
