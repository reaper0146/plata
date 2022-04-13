#!/usr/bin/env python3
"""
This file contains the script that will be run on provider nodes executing our task.
It is included in the image built from this project's Dockerfile.
"""

import json
from hashlib import sha256
from pathlib import Path
from typing import List

ENCODING = "utf-8"

HASH_PATH = "/golem/input/hash.json"
WORDS_PATH = "/golem/input/words.json"
RESULT_PATH = "/golem/output/result.json"

if __name__ == "__main__":
    result = ""

    with open(HASH_PATH) as f:
        target_hash: str = json.load(f)

    with open(WORDS_PATH) as f:
        words: List[str] = json.load(f)
        for line in words:
            line_bytes = bytes(line.strip(), ENCODING)
            line_hash = sha256(line_bytes).hexdigest()
            if line_hash == target_hash:
                result = line
                break

    with open(RESULT_PATH, mode="w", encoding=ENCODING) as f:
        json.dump(result, f)
