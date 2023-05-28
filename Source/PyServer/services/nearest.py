from scipy import spatial


def findNearest(location, shelters):
    shelers_tuples = []
    for shelter in shelters:
        tup = shelter[1:3]
        shelers_tuples.append(tup)

    tree = spatial.KDTree(shelers_tuples)
    d, i = tree.query(location, k=6, p=2, eps=0)
    result = []
    for ind in i:
        if not d[list(i).index(ind)] == float('inf'):
            tup = shelters[ind]
            result.append(tup)
    return result