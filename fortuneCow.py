import discord
import os

from os import system, path
from io import StringIO
from subprocess import getoutput, run
import sys
from random import randrange
from PIL import Image, ImageDraw, ImageFont
from math import ceil

client = discord.Client()
run("install -pkg cowsay")
run("install -pkg fortune")
@client.event
async def on_ready():
    print('Fortune Bot has logged in as {0.user}'.format(client))

@client.event
async def on_message(message):
    if message.author == client.user:
        return

    
    if (message.content.find('!fortune') != -1):
        # Choose a random cow type from the list of all cowsay characters
        
        # Use our choice to generate a cowsay
        msg = getoutput('fortune | cowsay')

        # Image generation: calculate length and width of image and instantiate
        msgFont = ImageFont.truetype("arial.ttf", 12)
        msgDim = msgFont.getsize_multiline(msg)

        msgImg = Image.new('RGB', (ceil(msgDim[0] + 0.1*msgDim[0]), ceil(msgDim[1] + 0.1*msgDim[1])), (255, 255, 255))
        msgDraw = ImageDraw.Draw(msgImg)
        msgDraw.text((16, 0), msg, fill=(0, 0, 0, 255), font=msgFont)
        # TODO: Don't save to hard drive just to load again
        msgImg.save('/tmp/fortune.png')
        await message.channel.send(file=discord.File('/tmp/fortune.png'))

# Yeah nah not letting you lot see my ~ultra secret~ Discord Token(tm)


client.run("ODgyODIxODI3MTY3MTUwMTIw.YTA95Q.U0kT1bOZOcjOwXsfAJYoKHOatqU")