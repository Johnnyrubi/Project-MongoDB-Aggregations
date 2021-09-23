db.movies.aggregate([
  {
    $match:
      {
        $and:
        [
          { genres: { $nin: ["Crime", "Horror"] } },
          { "imdb.rating": { $gte: 7 } },
          { rated: { $in: ["PG", "G"] } },
          { languages: { $all: ["English", "Spanish"] } },
        ],
      },
  },
  {
    $project: {
      _id: 0,
      titulo: "$title",
      avaliado: "$rated",
      notaIMDB: "$imdb.rating",
      votosIMDB: "$imdb.votes",
      ano: "$year",
    },
  },
  {
    $sort: {
      titulo: 1,
      notaIMDB: -1,
      ano: -1,
    },
  },
]);
