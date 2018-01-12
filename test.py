#!/usr/bin/python
# -*- coding: UTF-8 -*-
import json
import re

cardName = ['' for x in range(1000)]
cardText = ['' for x in range(1000)]
data = {}

pattern = {"{flying}":"飞行", "{charge}":"冲锋", "{taunt}":"嘲讽"}

def lineRegulator(s):
    '''
    处理掉每行的多余符号，并用空格拆分
    '''
    s = s.strip()
    s = s.replace('.', ' ').replace(';', ' ')
    s = s.replace('<b>', '').replace('</b>', '')
    s = s.replace('\\n', '')
    # s = s.replace('[', '').replace(']', '')
    s = s.split(" ")
    return s


def replaceKeywords(l, p):
    '''
    根据某个map，替换字符串中的所有keywords
    '''
    for id, vars in p.items():
        l.replace(id, vars)
    # print(l)
    return l


def storeJson(data):
    with open('E:\output.json', 'w', encoding='UTF-8') as json_file:
        json_file.write(json.dumps(data, ensure_ascii=False, indent=2))



def loadJson():
    with open('E:\output.json', 'rt', encoding='UTF-8') as json_file:
        data = json.load(json_file)
        return data


if __name__ == "__main__":

    data = loadJson()
    '''
    JSON format:list[dict]
    dict:{id,color,....}
    '''
    # print(data)
    fin = open('E:\CN.txt', 'rt', encoding='UTF-8')

    while True:
        line = fin.readline()
        if not line:
            break
        tmp = lineRegulator(line)
        text = ""
        for id, vars in enumerate(tmp):
            # 将第三项开始的CardText合并
            if id < 2:
                continue
            else:
                text += " "
                text += vars
        text = lineRegulator(text)
        # text = replaceKeywords(text, pattern)
        tmp[2] = " ".join(text)
        tmp = tmp[:3]
        if tmp[1] == 'cardName':
            cardName[int(tmp[0])] = tmp[2]
        elif tmp[1] == 'cardText':
            cardText[int(tmp[0])] = tmp[2]

    for name, text in zip(cardName, cardText):
        # print(name, text)
        pass
    '''
    JSON format:list[dict]
    dict:{id,color,....}
    '''
    for dic in data:
        dic['name'] += (' ' + cardName[dic['id']])
        dic['text'] += (' ' + cardText[dic['id']])
    # print(data)
    storeJson(data)
    fin.close()
