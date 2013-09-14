require 'json'

module Jekyll

	$site_search_index = ""

	class Post
		def location_on_server
			url
		end
	end

	class Page
		def location_on_server
			location = "#{@dir}#{url}"
			location.gsub(/index.html$/, "")
		end
	end

	class SitesearchGenerator < Generator
		priority :lowest
		def generate( site )
			pagesAndPosts = []

			site.posts.each do |post|
				pagesAndPosts.push( get_postpage( post ) )
			end

			site.pages.each do |page|
				pagesAndPosts.push( get_postpage( page ) )
			end

			$site_search_index = pagesAndPosts.to_json
		end

		def get_postpage( postpage )
			pp = { "href" => postpage.location_on_server, "title" => postpage.data['title'] }
			pp["title"] = postpage.name unless pp["title"]

			pp
		end
	end

	class SiteSearchIndexTag < Liquid::Tag
		def initialize(tag_name, text, tokens)
			super
		end

		def render(context)
			$site_search_index
		end
	end
end

Liquid::Template.register_tag('site_search_index', Jekyll::SiteSearchIndexTag)