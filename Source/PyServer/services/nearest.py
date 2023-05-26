import math

from scipy import spatial


def findNearest(location, shelters):
    shelers_tuples = []
    for shelter in shelters:
        tup = shelter[0:2]
        print(tup)
        shelers_tuples.append(tup)

    tree = spatial.KDTree(shelers_tuples)
    d, i = tree.query(location, k=6, p=2, eps=0)
    print(d, i)
    result = []
    for ind in i:
        if not d[ind] == float('inf'):
            tup = shelters[ind]
            result.append(tup[:-1])
    return result