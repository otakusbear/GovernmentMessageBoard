from apps.home.models import Data
import numpy as np
from sentence_transformers import SentenceTransformer,util
import pandas as pd

model=SentenceTransformer('symanto/sn-xlm-roberta-base-snli-mnli-anli-xnli')

def simrpl(msg,data):
    msg_embeds =model.encode(msg, batch_size=64, show_progress_bar=True, convert_to_tensor=True)
    for i in range(len(data)):
        data_embeds=model.encode(data['msgcontent'][i], batch_size=64, show_progress_bar=True, convert_to_tensor=True)
        if util.cos_sim(msg_embeds,data_embeds)>0.8:
            refrpl=data['rplcontent'][i]
            break
    return refrpl

