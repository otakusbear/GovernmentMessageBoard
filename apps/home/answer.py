import pandas as pd

import openai
# 加载xlsx文件
import os

script_dir = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(script_dir, 'reply.xlsx')
refs = pd.read_excel(file_path)
refs = refs['回复内容']

def run_llm(prompt, temperature=0, max_tokens=3072, engine="gpt-3.5-turbo-1106"):
    # if "llama" not in engine.lower():
    #     openai.api_key = opeani_api_keys
    #     # openai.api_base = "http://localhost:8000/v1"
    # else:
    #     openai.api_key = "sk-ewhjia07U7vp07bE44D4F93bEeB543CcA0F888045a8eF6Bd"
    openai.api_key = "sk-wnR0zdcCsrsa6gONY9U3lfE8cigH1Mry6szFDDtbsbI0YLlo"
    openai.api_base = "https://xiaoai.plus/v1"
    messages = [{"role" :"system" ,"content" :"You are an AI assistant that helps people find information."}]
    message_prompt = {"role" :"user" ,"content" :prompt}
    messages.append(message_prompt)
    print("start openai")
    print(messages)
    f = 0
    while (f == 0):
        try:
            print(engine)
            response = openai.ChatCompletion.create(
                model=engine,
                messages=messages,
                temperature=temperature,
                max_tokens=max_tokens,
                frequency_penalty=0,
                presence_penalty=0)
            result = response["choices"][0]['message']['content']
            # result = pool(prompt)
            f = 1
        except Exception as e:  # Catch the exception
            print("Error details:", e)  # Print the error
            # time.sleep(18)

    print("end openai")
    return result




import textdistance

# 创建一个Cosine对象
cosine = textdistance.Cosine()

def get_reply(msg):
    # 计算输入消息和数据框中所有消息的相似度
    similarities = refs.apply(lambda x: cosine.similarity(msg, x))

    # 找到两个最相似消息的索引
    top2_indices = similarities.argsort()[-2:][::-1]
    top2_replies = refs.iloc[top2_indices]


    # 构造提示
    prompt = '你是一个政务留言回复专家，你的任务是根据类似留言的过往回复内容，对输入留言进行回复。以下是两个与当前留言最相似的过往留言的回复内容：\n1. {}\n2. {}\n请你根据这两个回复的风格和用语，对以下留言进行回复：{}\n注意，你的回复内容需要针对留言的诉求和问题，同时保持与示例回复相近的风格和用语。'.format(top2_replies.iloc[0], top2_replies.iloc[1], msg)

    # 生成回复
    reply = run_llm(prompt)
    print(reply)
    return reply
