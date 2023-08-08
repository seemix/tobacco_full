module.exports = {
    $group: {
        _id: null,
        totalSum: { $sum: '$total' },
        completedSum: { $sum: { $cond: ['$completed', '$total', 0] } },
        uncompletedSum: { $sum: { $cond: ['$completed', 0, '$total'] } },
    },
}