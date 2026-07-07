export const cmsSchema = {
  video: {
    fields: [
      "youtubeId",
      "title",
      "description",
      "thumbnailUrl",
      "publishedAt",
      "duration",
      "views",
      "subjectSlugs",
      "examSlugs",
      "summary",
      "importantPoints",
      "transcript",
      "keyTakeaways",
      "examRelevance",
      "notesFileUrl",
      "faqs"
    ]
  },
  article: {
    fields: [
      "slug",
      "title",
      "description",
      "body",
      "sourceVideoId",
      "subjectSlugs",
      "examSlugs",
      "seoTitle",
      "seoDescription",
      "keywords",
      "faqs",
      "publishedAt"
    ]
  },
  note: {
    fields: ["title", "slug", "description", "category", "fileUrl", "subjectSlugs", "examSlugs", "relatedVideoId", "publishedAt"]
  },
  subject: {
    fields: ["name", "slug", "description", "keywords", "faqs", "internalLinks"]
  },
  exam: {
    fields: ["name", "slug", "description", "keywords", "focusAreas", "faqs", "internalLinks"]
  }
} as const;
