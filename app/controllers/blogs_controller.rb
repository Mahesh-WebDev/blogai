require "httparty"
class BlogsController < ApplicationController
  before_action :set_blog, only: %i[ show edit update destroy ]

  # GET /blogs or /blogs.json
  def index
    @blogs = Blog.all
  end

  # GET /blogs/1 or /blogs/1.json
  def show
  end

  # GET /blogs/new
  def new
    @blog = Blog.new
  end

  # GET /blogs/1/edit
  def edit
  end

  # POST /blogs or /blogs.json
  def create
    @blog = Blog.new(blog_params)

    respond_to do |format|
      if @blog.save
        format.html { redirect_to @blog, notice: "Blog was successfully created." }
        format.json { render :show, status: :created, location: @blog }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @blog.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /blogs/1 or /blogs/1.json
  def update
    respond_to do |format|
      if @blog.update(blog_params)
        format.html { redirect_to @blog, notice: "Blog was successfully updated." }
        format.json { render :show, status: :ok, location: @blog }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @blog.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /blogs/1 or /blogs/1.json
  def destroy
    @blog.destroy!

    respond_to do |format|
      format.html { redirect_to blogs_path, status: :see_other, notice: "Blog was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  def generate_blog
    title = params[:title]
    if title.blank?
      render json: { error: "Title is missing" }, status: :unprocessable_entity
      return
    end
    prompt = "Write a 500 words blog on title #{title}. The characters length should be strictly below 5000"
    api_key = ENV["GEMINI_API_KEY"]

    if api_key.blank?
      render json: { error: "API key is missing from environment variables." }, status: :unprocessable_entity
      return
    end

    # Gemini API URL
    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-8b:generateContent?key=#{api_key}"

    # Structure the request body to match the curl example
    request_body = {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ]
    }.to_json

    # Make the API request to Gemini
    response = HTTParty.post(
      url,
      body: request_body,
      headers: {
        "Content-Type" => "application/json"
      }
    )

    # Check the response from Gemini
    if response.code == 200
      # Extract generated content from the response
      generated_content = response.parsed_response["candidates"].first["content"]["parts"].first["text"]
      # Render the generated content as the body of the blog
      render json: { body: generated_content }
    else
      error_details = JSON.parse(response.body)
      render json: { error: error_details.dig("error", "message") || "Unknown error" }, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_blog
      @blog = Blog.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def blog_params
      params.require(:blog).permit(:title, :body)
    end
end
