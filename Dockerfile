FROM node:18-alpine AS builder

RUN mkdir /app

COPY . /app

# Set environment variables
ENV PUBLIC_SUPABASE_URL=${PUBLIC_SUPABASE_URL} \
    PUBLIC_SUPABASE_ANON_KEY=${PUBLIC_SUPABASE_ANON_KEY}

RUN cd /app && npm install && node -r dotenv/config build

FROM node:18-alpine

RUN mkdir /app

COPY --from=builder /app/build /app/build
COPY --from=builder /app/package.json /app/package-lock.json /app/

RUN cd /app && \ 
  npm install --production

WORKDIR /app

EXPOSE 3000

CMD ["node", "build/index.js"]