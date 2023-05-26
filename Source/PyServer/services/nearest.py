from scipy import spatial


def findNearest(location, shelters):
    shelers_tuples = []
    for shelter in shelters:
        tup = (shelter['latitude'], shelter['longitude'])
        shelers_tuples.append(tup)

    tree = spatial.KDTree(shelers_tuples)
    d, i = tree.query(location, k=6, p=2)
    print(d, i)
    result = []
    for ind in i:
        result.append(shelters[ind])
    return result